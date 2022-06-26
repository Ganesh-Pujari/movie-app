import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import { Header } from "../../shared/Header";
import "./Home.css";

const Home: React.FC = () => {
  // const toggle: any = document.querySelector("#themeToggle");
  // toggle.addEventListener("ionChange", (ev: any) => {
  //   localStorage.setItem("darkTheme", ev.detail.checked);
  //   document.body.classList.toggle("dark", ev.detail.checked);
  // });
  // useEffect(() => {
  //   const darkTheme: any = localStorage.getItem("darkTheme");
  //   document.body.classList.toggle("dark", JSON.parse(darkTheme));
  // }, []);

  return (
    <IonPage>
      <Header heading={"Home"} showSearch={true}/>
      <IonContent className="content" fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
