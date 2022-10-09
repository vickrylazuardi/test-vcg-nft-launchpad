import Header from "../components/Home/Header";

export default function Home() {
  const bgPage = {
    backgroundImage: `url('/images/bg.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div id="home" className="global-container" style={bgPage}>
      <Header />
    </div>
  );
}
