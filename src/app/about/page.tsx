import Link from "next/link";
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About my web
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  F
                </div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <span className="text-2xl font-semibold text-gray-800">
                    สวัสดีครับ
                  </span>
                  <span className="ml-2">
                    ผมชื่อ{" "}
                    <span className="font-semibold text-blue-600">ฟลุก</span>{" "}
                    เป็นนักศึกษาคณะวิศวกรรมศาสตร์
                    สาขาวิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิตอล
                  </span>
                </p>

                <p className="text-lg">
                  
                  <span className="font-semibold text-indigo-600">
                    จุฬาลงกรณ์มหาวิทยาลัย
                  </span>
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <p className="text-lg">
                    ผมได้สร้างเว็บรวบรวมข้อสอบขึ้นมา
                    เพื่อฝึกฝนการเขียนเว็บของตัวเอง
                    และผมจะยินดีอย่างยิ่งถ้าข้อสอบเหล่านี้ สามารถช่วยให้น้อง ๆ
                    ที่กำลังเตรียมตัวสอบเข้ามหาวิทยาลัยได้ด้วย
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
                  <p className="text-lg">
                    <span className="font-semibold text-yellow-700">
                      📝 หมายเหตุ:
                    </span>
                    <span className="ml-2">
                      ถ้าตัวข้อสอบมีข้อผิดพลาด หรือมีข้อสอบที่ไม่เหมาะสม
                      (ติดลิขสิทธิ์) สามารถแจ้งมาได้ที่ fluk3874@gmail.com
                      และก็ขออภัยมา ณ ที่นี้ด้วยครับ
                    </span>
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                  <p className="text-lg">
                    <span className="font-semibold text-green-700">
                      💡 ป.ล.
                    </span>
                    <span className="ml-2">
                      เว็บไซต์นี้ไม่ได้มีเจตนาเพื่อสร้างรายได้แต่อย่างใด
                      เป็นเพียงโปรเจกต์ส่วนตัวของผมเท่านั้น
                    </span>
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <Link href="/myexams">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span className="text-lg font-semibold">
                      🚀 เริ่มฝึกทำข้อสอบกันเลย!
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
