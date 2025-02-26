
const Home = () => {
  return (
    <div className="bg-[#170f23] text-white min-h-screen">
      <main className="container mx-auto mt-24 p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Gợi Ý Cho Bạn</h2>
          <div className="flex space-x-4">
            <div className="album">
              <img src="path/to/image1.jpg" alt="hai mươi hai (22)" className="w-full rounded-lg" />
              <div className="text-center">hai mươi hai (22) - Hứa Kim Tuyền, AMEE</div>
            </div>
            <div className="album">
              <img src="path/to/image2.jpg" alt="Shay Nắnggg" className="w-full rounded-lg" />
              <div className="text-center">Shay Nắnggg - AMEE, Obito</div>
              <audio controls>
                <source src="https://vnno-zn-5-tf-a128-z3.zmdcdn.me/717f19f7abd998a8c144b53937a990aa?authen=exp=1740727362~acl=/717f19f7abd998a8c144b53937a990aa*~hmac=fb92f8470fdaf8c159e04f6cab4b35fe" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>


            {/* More albums here */}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Chill</h2>
          <div className="flex space-x-4">
            <div className="album">
              <img src="path/to/image3.jpg" alt="Ngày Lênh Đênh" className="w-full rounded-lg" />
              <div className="text-center">Ngày Lênh Đênh</div>
            </div>
            <div className="album">
              <img src="path/to/image4.jpg" alt="Nhạc Lofi Chill Gây Nghiện" className="w-full rounded-lg" />
              <div className="text-center">Nhạc Lofi Chill Gây Nghiện</div>
            </div>
            {/* More albums here */}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mới Phát Hành</h2>
          <div className="flex space-x-4">
            <div className="album">
              <img src="path/to/image5.jpg" alt="Chín Tầng Mây" className="w-full rounded-lg" />
              <div className="text-center">Chín Tầng Mây - MLee, Nhật Hoàng, Avi, Drum7</div>
            </div>
            {/* More albums here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
