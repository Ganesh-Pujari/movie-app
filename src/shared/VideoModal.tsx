import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
} from "@ionic/react";
interface ContainerProps {
  videos: any;
}
const VideoModal: React.FC<ContainerProps> = ({ videos }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <IonModal isOpen={showModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem style={{
            display:'flex'
        }}>
          {videos &&
            videos.map((video: any) => {
              console.log(
                "🚀 ~ file: VideoModal.tsx ~ line 53 ~ videos.map ~ video",
                video
              );
              return (
                <div>
                  <div>
                    <iframe
                      key={video.id}
                      src={`https://www.youtube.com/embed/${video["key"]}`}
                      title={video.title}
                    ></iframe>
                  </div>
                </div>
              );
            })}
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default VideoModal;
