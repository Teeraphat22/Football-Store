import { Button } from '@/components/ui/button'

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter 280px */}
        <aside className="w-full md:w-[280px] flex-shrink-0">
          <div className="sticky top-24 bg-surface p-4 rounded-lg border shadow-sm">
            <h2 className="font-bold text-lg mb-4 font-kanit">กรองผลลัพธ์</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 font-kanit text-sm text-muted-foreground">หมวดหมู่</h3>
                <div className="space-y-2 font-kanit text-sm">
                  {['ทั้งหมด', 'เลี้ยงบอล', 'ยิงประตู', 'ผู้รักษาประตู', 'ฟิตเนส', 'แทคติก'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 font-kanit text-sm text-muted-foreground">ระดับผู้เล่น</h3>
                <div className="space-y-2 font-kanit text-sm">
                  {['ทั้งหมด', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(level => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full font-kanit">นำไปใช้</Button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-kanit">หนังสือทั้งหมด</h1>
            <select className="border rounded-md px-3 py-1.5 text-sm font-kanit focus:outline-none focus:ring-2 focus:ring-primary">
              <option>เรียงตาม: ล่าสุด</option>
              <option>เรียงตาม: ยอดนิยม</option>
              <option>ราคา: ต่ำไปสูง</option>
              <option>ราคา: สูงไปต่ำ</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* TODO: Map books from database here */}
            <div className="col-span-full py-12 text-center text-muted-foreground font-kanit">
              (รายการหนังสือจะแสดงที่นี่)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
