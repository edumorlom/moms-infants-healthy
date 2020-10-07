import React from "react";
import { ScrollView, Linking } from "react-native";
import SelectionButton from "./SelectionButton";
import appointments from "../../assets/appointments.png";
import document from "../../assets/document.png";
import doctor from "../../assets/doctor.png";
import ResourcesInfo from "./ResourcesInformation";
import translate from "./getLocalizedText";
import appStyles from "./AppStyles";

export default function Resources(props) {

  let getResourceName = (name) => {
    return name.length > 40
    ? name.substring(0, 40) + "..."
    : name;
  }


  let resourceButtons = ResourcesInfo().map((resource, key) => (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      key={key}
      icon={resource.icon}
      text={getResourceName(resource.resource)}
      subtext={resource.subtitle}
      onPress={() => Linking.openURL(resource.website)}
    />
  ));
  let appointmentButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate("appointment")}
      subtext={translate("appointmentInfo")}
      icon={appointments}
      onPress={() => {
        props.setLowerPanelContent("Appointment");
      }}
    />
  );

  let documentUploadButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate("documents")}
      subtext={translate("documentsSubtitle")}
      icon={document}
      onPress={() => {
        props.setLowerPanelContent("documents");
      }}
    />
  );

  let namesReferenceButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate("NameReference")}
      subtext={translate("ReferenceSubtitle")}
      icon={doctor}
      onPress={() => {
        props.setLowerPanelContent("ReferenceNames");
      }}
    />
  );

  

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%"}}
    >
      {resourceButtons}
      {documentUploadButton}
      {appointmentButton}
      {namesReferenceButton}
    </ScrollView>
  );
}
