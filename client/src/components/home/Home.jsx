import React from 'react';
import { Link } from 'react-router-dom';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';
const Home = () => {
  const { loggedIn } = useVerifyLogin(false);
  if (loggedIn === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
        <h1 className="text-6xl font-bold mb-25">Loading...</h1>
      </div>
    )
  }
  if (loggedIn) {
    return (
<div
  className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4E12AQE-IwX7taZwqg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628813539387?e=1746662400&v=beta&t=Wo4rhA13J0GmepdQqX4Gs_kOHnJE2NakDJUX1xyCZ9o')"}}
>
  <div className="relative z-10">
    <h1 className="text-6xl font-bold mb-40 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
      Welcome to Board Together!
    </h1>
  </div>

  <Link to="/selection" data-testid="selection" className="btn btn-accent text-2xl py-6 px-10 bg-white text-black border-white border-2
             hover:bg-accent hover:text-white hover:border-white transition duration-300 select-none">
    Go to Selection Page
  </Link>

  <small className="fixed bottom-4 right-4 text-lg text-black z-10 select-none">Hasbruh<span className="text-xs select-none">&copy;</span></small>
</div>
    );
  }
  return (
    <div
  className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4E12AQE-IwX7taZwqg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628813539387?e=1746662400&v=beta&t=Wo4rhA13J0GmepdQqX4Gs_kOHnJE2NakDJUX1xyCZ9o')"}}
>
  <div className="relative z-10">
    <h1 className="text-6xl font-bold mb-40 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
      Welcome to Board Together!
    </h1>
  </div>

  <div className="space-x-8">
        <Link to="/login" data-testid="login" className="btn btn-accent btn-outline text-2xl py-6 px-10 glass select-none">Login</Link>
        <Link to="/signup" data-testid="signup" className="btn btn-accent btn-outline text-2xl py-6 px-10 glass select-none">Sign Up</Link>
      </div>

  <small className="fixed bottom-4 right-4 text-lg text-black z-10 select-none">Hasbruh<span className="text-xs select-none">&copy;</span></small>
</div>
  );
};

export default Home;