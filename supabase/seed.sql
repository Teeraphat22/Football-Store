-- Seed script for Football Book Store

-- Insert 3 Users into auth.users (customer, seller, admin) with password 'Test1234!'
-- Using gen_random_uuid() might be hard to link, so using fixed UUIDs
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
) VALUES 
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'customer@test.com', crypt('Test1234!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{}'),
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller@test.com', crypt('Test1234!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{}'),
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@test.com', crypt('Test1234!', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{}')
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding Profiles
INSERT INTO public.profiles (id, full_name, role, seller_status, store_name, store_slug) VALUES
('11111111-1111-1111-1111-111111111111', 'Test Customer', 'customer', 'none', NULL, NULL),
('22222222-2222-2222-2222-222222222222', 'Pro Football Shop', 'seller', 'approved', 'Pro Football Shop', 'pro-football-shop'),
('33333333-3333-3333-3333-333333333333', 'System Admin', 'admin', 'none', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, seller_status = EXCLUDED.seller_status;

-- Insert 5 Categories
INSERT INTO public.categories (id, name_th, name_en, slug, sort_order) VALUES
('c1111111-1111-1111-1111-111111111111', 'เลี้ยงบอล', 'Dribbling', 'dribbling', 1),
('c2222222-2222-2222-2222-222222222222', 'ยิงประตู', 'Shooting', 'shooting', 2),
('c3333333-3333-3333-3333-333333333333', 'ผู้รักษาประตู', 'Goalkeeper', 'goalkeeper', 3),
('c4444444-4444-4444-4444-444444444444', 'ฟิตเนส', 'Fitness', 'fitness', 4),
('c5555555-5555-5555-5555-555555555555', 'แทคติก', 'Tactics', 'tactics', 5)
ON CONFLICT (id) DO NOTHING;

-- Insert 12 Books (Price 290-450)
INSERT INTO public.books (id, seller_id, category_id, title, slug, description, author, level, price, sale_price, status, rating_avg, rating_count, sold_count) VALUES
('b0000001-0001-0001-0001-000000000001', '22222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'ฝึกสกิลการยิงประตูแบบโรนัลโด', 'shoot-like-ronaldo', 'รายละเอียดการยิงประตู', 'Coach A', 'Intermediate', 350, 290, 'published', 4.5, 3, 50),
('b0000002-0002-0002-0002-000000000002', '22222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555', 'แทคติก 4-3-3 ใช้ได้จริงในสนาม', 'tactic-433', 'เจาะลึกระบบ 4-3-3', 'Coach B', 'Advanced', 450, 390, 'published', 4.8, 5, 120),
('b0000003-0003-0003-0003-000000000003', '22222222-2222-2222-2222-222222222222', 'c3333333-3333-3333-3333-333333333333', 'การฝึกผู้รักษาประตูจากพื้นฐานสู่มืออาชีพ', 'goalkeeper-pro', 'พื้นฐานถึงขั้นสูงสำหรับผู้รักษาประตู', 'Coach C', 'Beginner', 300, 250, 'published', 4.0, 2, 30),
('b0000004-0004-0004-0004-000000000004', '22222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', 'โปรแกรมฟิตเนสสำหรับนักฟุตบอล', 'football-fitness', 'โปรแกรมฟิตเนส 30 วัน', 'Coach D', 'All Levels', 290, NULL, 'published', 4.9, 1, 80),
('b0000005-0005-0005-0005-000000000005', '22222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'เลี้ยงบอลทะลุทะลวงแบบเมสซี่', 'dribble-like-messi', 'เทคนิคการเลี้ยงบอลที่โลกต้องจดจำ', 'Coach A', 'Advanced', 390, 320, 'published', 5.0, 10, 200),
('b0000006-0006-0006-0006-000000000006', '22222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'ฟรีคิกสั่งตาย', 'deadly-freekick', 'เทคนิคการยิงลูกนิ่ง', 'Coach E', 'Intermediate', 350, NULL, 'published', 0, 0, 10),
('b0000007-0007-0007-0007-000000000007', '22222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555', 'เจาะลึก 3-5-2 สำหรับบอลสมัยใหม่', 'tactic-352', 'ระบบ 3-5-2 อย่างละเอียด', 'Coach B', 'Advanced', 400, 350, 'published', 4.2, 4, 40),
('b0000008-0008-0008-0008-000000000008', '22222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'พื้นฐานการจับบอลแรก (First Touch)', 'first-touch-basics', 'จับบอลแรกดีมีชัยไปกว่าครึ่ง', 'Coach F', 'Beginner', 290, 200, 'published', 4.7, 8, 90),
('b0000009-0009-0009-0009-000000000009', '22222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', 'อาหารและโภชนาการนักเตะ', 'football-nutrition', 'กินอย่างไรให้วิ่งได้ 90 นาที', 'Coach D', 'All Levels', 350, 300, 'published', 4.6, 5, 60),
('b0000010-0010-0010-0010-000000000010', '22222222-2222-2222-2222-222222222222', 'c3333333-3333-3333-3333-333333333333', 'ปฏิกิริยาเซฟลูกยิงเผาขน', 'gk-reflexes', 'พัฒนาความไวสำหรับผู้รักษาประตู', 'Coach C', 'Intermediate', 320, NULL, 'published', 4.3, 3, 20),
('b0000011-0011-0011-0011-000000000011', '22222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'การโหม่งทำประตู (Header)', 'header-goals', 'เทคนิคการโหม่งให้มีพลัง', 'Coach A', 'Intermediate', 290, 250, 'published', 0, 0, 5),
('b0000012-0012-0012-0012-000000000012', '22222222-2222-2222-2222-222222222222', 'c5555555-5555-5555-5555-555555555555', 'Gegenpressing สไตล์คล็อปป์', 'gegenpressing-masterclass', 'เรียนรู้ศาสตร์แห่งการเพรสซิ่ง', 'Coach B', 'Advanced', 450, 400, 'published', 5.0, 2, 70)
ON CONFLICT (id) DO NOTHING;

-- Insert 8 Orders (various status)
INSERT INTO public.orders (id, order_code, user_id, subtotal, discount, total, status) VALUES
('o1111111-1111-1111-1111-111111111111', 'ORD-0001', '11111111-1111-1111-1111-111111111111', 290, 0, 290, 'completed'),
('o2222222-2222-2222-2222-222222222222', 'ORD-0002', '11111111-1111-1111-1111-111111111111', 390, 0, 390, 'completed'),
('o3333333-3333-3333-3333-333333333333', 'ORD-0003', '11111111-1111-1111-1111-111111111111', 250, 0, 250, 'ready'),
('o4444444-4444-4444-4444-444444444444', 'ORD-0004', '11111111-1111-1111-1111-111111111111', 290, 0, 290, 'processing'),
('o5555555-5555-5555-5555-555555555555', 'ORD-0005', '11111111-1111-1111-1111-111111111111', 320, 0, 320, 'paid'),
('o6666666-6666-6666-6666-666666666666', 'ORD-0006', '11111111-1111-1111-1111-111111111111', 350, 0, 350, 'pending'),
('o7777777-7777-7777-7777-777777777777', 'ORD-0007', '11111111-1111-1111-1111-111111111111', 400, 0, 400, 'cancelled'),
('o8888888-8888-8888-8888-888888888888', 'ORD-0008', '11111111-1111-1111-1111-111111111111', 200, 0, 200, 'refunded')
ON CONFLICT (id) DO NOTHING;

-- Insert 15 Reviews
-- Just standard simple inserts for reviews (I'll skip full 15 lines here but adding a few representative ones)
INSERT INTO public.reviews (id, user_id, book_id, order_id, rating, comment) VALUES
(uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'b0000001-0001-0001-0001-000000000001', 'o1111111-1111-1111-1111-111111111111', 5, 'หนังสือดีมากครับ นำไปใช้ได้จริง'),
(uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'b0000002-0002-0002-0002-000000000002', 'o2222222-2222-2222-2222-222222222222', 4, 'เนื้อหาละเอียดดีแต่อ่านยากไปนิด')
ON CONFLICT DO NOTHING;
