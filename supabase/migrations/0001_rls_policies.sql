-- 0001_rls_policies.sql

-- Helper Functions
CREATE OR REPLACE FUNCTION auth_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON profiles FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete any profile" ON profiles FOR DELETE USING (is_admin());

-- categories
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (is_admin());

-- books
CREATE POLICY "Anyone can read published books" ON books FOR SELECT USING (status = 'published' OR is_admin() OR auth.uid() = seller_id);
CREATE POLICY "Sellers can insert books" ON books FOR INSERT WITH CHECK (auth_role() = 'seller');
CREATE POLICY "Sellers can update own books" ON books FOR UPDATE USING (auth.uid() = seller_id OR is_admin());
CREATE POLICY "Admins can delete books" ON books FOR DELETE USING (is_admin());

-- orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  auth.uid() = user_id OR 
  is_admin() OR 
  EXISTS (SELECT 1 FROM order_items WHERE order_items.order_id = orders.id AND order_items.seller_id = auth.uid())
);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (is_admin());

-- order_items
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()) OR
  auth.uid() = seller_id OR
  is_admin()
);
CREATE POLICY "System can insert order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update order items" ON order_items FOR UPDATE USING (is_admin());

-- order_status_history
CREATE POLICY "Users can view relevant order history" ON order_status_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_status_history.order_id AND orders.user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM order_items WHERE order_items.order_id = order_status_history.order_id AND order_items.seller_id = auth.uid()) OR
  is_admin()
);
CREATE POLICY "System/Admins/Sellers can insert history" ON order_status_history FOR INSERT WITH CHECK (true);

-- library
CREATE POLICY "Users can view own library" ON library FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "System can insert to library" ON library FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own library progress" ON library FOR UPDATE USING (auth.uid() = user_id);

-- reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert reviews for their purchased books" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Sellers can update to reply" ON reviews FOR UPDATE USING (EXISTS (SELECT 1 FROM books WHERE books.id = reviews.book_id AND books.seller_id = auth.uid()));

-- coupons
CREATE POLICY "Active coupons are viewable by everyone" ON coupons FOR SELECT USING (is_active = true OR is_admin());
CREATE POLICY "Admins manage coupons" ON coupons FOR ALL USING (is_admin());

-- payouts
CREATE POLICY "Sellers view own payouts" ON payouts FOR SELECT USING (auth.uid() = seller_id OR is_admin());
CREATE POLICY "Sellers request payouts" ON payouts FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Admins update payouts" ON payouts FOR UPDATE USING (is_admin());

-- notifications
CREATE POLICY "Users view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System inserts notifications" ON notifications FOR INSERT WITH CHECK (true);

-- audit_logs
CREATE POLICY "Admins view audit logs" ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY "System inserts audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- Storage Buckets Setup & Policies (using standard Supabase approach)
INSERT INTO storage.buckets (id, name, public) VALUES 
('covers', 'covers', true),
('previews', 'previews', true),
('avatars', 'avatars', true),
('ebooks', 'ebooks', false),
('videos', 'videos', false)
ON CONFLICT (id) DO NOTHING;

-- Covers (Public Read, Seller Write)
CREATE POLICY "Public covers view" ON storage.objects FOR SELECT USING (bucket_id = 'covers');
CREATE POLICY "Seller insert covers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'covers' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'seller');
CREATE POLICY "Seller update own covers" ON storage.objects FOR UPDATE USING (bucket_id = 'covers' AND auth.uid() = owner);
CREATE POLICY "Seller delete own covers" ON storage.objects FOR DELETE USING (bucket_id = 'covers' AND auth.uid() = owner);

-- Previews (Public Read, Seller Write)
CREATE POLICY "Public previews view" ON storage.objects FOR SELECT USING (bucket_id = 'previews');
CREATE POLICY "Seller insert previews" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'previews' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'seller');
CREATE POLICY "Seller update own previews" ON storage.objects FOR UPDATE USING (bucket_id = 'previews' AND auth.uid() = owner);
CREATE POLICY "Seller delete own previews" ON storage.objects FOR DELETE USING (bucket_id = 'previews' AND auth.uid() = owner);

-- Avatars (Public Read, User Write)
CREATE POLICY "Public avatars view" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users insert own avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);
CREATE POLICY "Users update own avatars" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);
CREATE POLICY "Users delete own avatars" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- E-books (Private Read, Seller Write)
CREATE POLICY "Private ebooks view" ON storage.objects FOR SELECT USING (bucket_id = 'ebooks' AND (auth.uid() = owner OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'));
CREATE POLICY "Seller insert ebooks" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ebooks' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'seller');
CREATE POLICY "Seller update own ebooks" ON storage.objects FOR UPDATE USING (bucket_id = 'ebooks' AND auth.uid() = owner);
CREATE POLICY "Seller delete own ebooks" ON storage.objects FOR DELETE USING (bucket_id = 'ebooks' AND auth.uid() = owner);

-- Videos (Private Read, Seller Write)
CREATE POLICY "Private videos view" ON storage.objects FOR SELECT USING (bucket_id = 'videos' AND (auth.uid() = owner OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'));
CREATE POLICY "Seller insert videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'seller');
CREATE POLICY "Seller update own videos" ON storage.objects FOR UPDATE USING (bucket_id = 'videos' AND auth.uid() = owner);
CREATE POLICY "Seller delete own videos" ON storage.objects FOR DELETE USING (bucket_id = 'videos' AND auth.uid() = owner);
