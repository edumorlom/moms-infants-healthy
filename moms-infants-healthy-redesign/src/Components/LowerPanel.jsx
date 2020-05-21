import {View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import LowerPanelSelection from "./LowerPanelSelection";
import FindCare from "./FindCare";
import ClinicInfo from "./ClinicInfo";
import LowerPanelHeader from "./LowerPanelHeader";
import Learn from "./Learn";

export default class LowerPanel extends React.Component {

    constructor(props) {
        super(props);
        this.goUp();
    }

    state = {panelStyle: {...appStyles.lowerPanel}};

    transition = null;

    

    goUp = () => {
        clearInterval(this.transition);
        this.transition = setInterval( () => {
            let panelStyle = {...appStyles.lowerPanel};
            panelStyle["bottom"] =  this.state.panelStyle.bottom + 25;

            if (this.state.panelStyle.bottom >= 0) {
                clearInterval(this.transition);
                panelStyle["bottom"] = 0;
            }

            this.setState({panelStyle: panelStyle});
        }, 0.1);
    };

    goDown = () => {
        clearInterval(this.transition);
        this.transition = setInterval( () => {
            let panelStyle = {...appStyles.lowerPanel};
            panelStyle["bottom"] = this.state.panelStyle.bottom - 25;

            if (this.state.panelStyle.bottom <= appStyles.lowerPanel.bottom) {
                clearInterval(this.transition);
                panelStyle["bottom"] = appStyles.lowerPanel.bottom;
            }

            this.setState({panelStyle: panelStyle});
        }, 0.1);
    };

    showContent = () => {
        
            {this.props.lowerPanelContent !== 'selection' && <LowerPanelHeader onPress = {this.props.onPress} goBack ={this.props.goBack} 
                lowerPanelContent={this.props.lowerPanelContent} getLocalizedText={this.props.getLocalizedText} 
                setFullPanel={this.props.setFullPanel} fullPanel={this.props.fullPanel}/>}
        if (this.props.lowerPanelContent === 'findCare') {
            return <FindCare clinics={this.props.clinics}
                             setClinicToView={this.props.setClinicToView}
                             setLowerPanelContent={this.props.setLowerPanelContent} getLocalizedText={this.props.getLocalizedText}/>
        } else if (this.props.lowerPanelContent === 'clinicInfo') {
            return <ClinicInfo clinic={this.props.clinicToView} setLowerPanelContent={this.props.setLowerPanelContent} getLocalizedText={this.props.getLocalizedText}/>
        } else if (this.props.lowerPanelContent === 'learn') {
            return <Learn setLowerPanelContent={this.props.setLowerPanelContent} getLocalizedText={this.props.getLocalizedText}/>
        } else {
            return <LowerPanelSelection fullName={this.props.fullName}
                                        logout={this.props.logout}
                                        setFullPanel={this.props.setFullPanel}
                                        fullPanel={this.props.fullPanel}
                                        setLowerPanelContent={this.props.setLowerPanelContent}
                                        getLocalizedText={this.props.getLocalizedText}/>
        }
    };
    

    componentDidUpdate(prevProps) {
        if (prevProps.fullPanel && !this.props.fullPanel) {
            this.goDown()
        } else if (!prevProps.fullPanel && this.props.fullPanel){
            this.goUp()
        }
    }

    //movePanel(fullPanel)

    render() {
        return (
            <View style={{...this.state.panelStyle, overflow: 'hidden'}}>
                {this.props.lowerPanelContent !== 'selection' && <LowerPanelHeader onPress = {this.props.onPress} goBack ={this.props.goBack} 
                lowerPanelContent={this.props.lowerPanelContent} getLocalizedText={this.props.getLocalizedText} setFullPanel={this.props.setFullPanel} fullPanel={this.props.fullPanel}/>}
                {this.showContent()}
            </View>
        )
    }
}