import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { searchCircle } from "ionicons/icons";
import { useHistory } from "react-router";
import "./Shared.css";
interface ContainerProps {
  heading: string;
  showSearch?: boolean;
}
export const Header: React.FC<ContainerProps> = ({ heading, showSearch }) => {
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar>
        {heading?.toLocaleLowerCase() !== "home" && (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        )}
        <IonTitle class="ion-text-start">{heading}</IonTitle>
        {showSearch && (
          <IonIcon
            className="search-icon"
            slot="end"
            icon={searchCircle}
            onClick={(e) => {
              e.preventDefault();
              history.push("/search");
            }}
          ></IonIcon>
        )}
      </IonToolbar>
    </IonHeader>
  );
};
