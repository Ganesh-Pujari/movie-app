import { Link, Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonToggle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonMenu, IonContent, IonList, IonItem } from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import { moon } from "ionicons/icons";
import { useEffect } from "react";
import { Search } from "./pages/Search/Search";
setupIonicReact();

const App: React.FC = () => (
  // useEffect(()=>{})

  <IonApp>
    <IonMenu side="start" menuId="first" contentId="sideMenu">
      <IonContent>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem routerLink="/home"> Home</IonItem>
          {/* <IonItem lines="full">
            <IonIcon slot="start" icon={moon}></IonIcon>
            <IonLabel>Toggle Theme</IonLabel>
            <IonToggle id="themeToggle" slot="end"></IonToggle>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonMenu>
    <IonReactRouter>
      <IonRouterOutlet id="sideMenu">
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/movie-details/:id">
          <MovieDetails />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
