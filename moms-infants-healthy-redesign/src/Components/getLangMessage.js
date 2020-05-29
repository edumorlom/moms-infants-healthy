import SpanishMessages from "../WeeklyMessage/SpanishMessages";
import CreoMessages from "../WeeklyMessage/CreoMessages";
// import Messages from '../WeeklyMessage/EnglishMessages';
import Messages from "../WeeklyMessage/weeklyMessage";

export default function getLangMessage(week, isInfant) {

  if (isInfant === true) {
    switch (week) {
      case 1:
        return "Put your baby to sleep on her back in his/her crib. Not in the bed with. Do not put pillows, blankets or stuffed animals in the crib. These things are dangerous. The baby can suffocate. This is the most important way to help your baby sleep safely through the night. Do you need help finding a clinic for your baby’s follow up visits? If yes, contact your NP for help";
      case 2:
        return "Keep the umbilical cord clean and dry to prevent infection. Clean it with rubbing alcohol. Leave it uncovered. If it is red or smelly, go to your clinic. Would you like a call from the NP?";
      case 3:
        return "Don’t forget you baby may need immunizations at 1 month of age. Make an appointment with your clinic. Do you need help finding a clinic for your baby’s follow up visits? If yes, contact your NP for help. ";
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        
        break;
    
      default:
        break;
    } 
    
  } else if(isInfant === false){

    switch (week) {
      case 1:
        return "Congratulations, your baby's here! Give your baby the best by breastfeeding. Are you interested in Breastfeeding Education and Support?  If yes, contact your NP Car Seat Safety: Remember to keep your baby rear facing even if you upgrade to a convertible car seat.  Keep the baby rear until they reach the maximum weight limit for that seat";
      case 2:
        return "Some bleeding after birth is normal. But if you soak more than 1 pad in less than 60 minutes or the bleeding gets heavier, go to the clinic. Breastfeeding helps to prevent heavy bleeding. Would you like a call from the NP? Make sure you get some rest, and you eat well.";
      case 3:
        return "Don’t forget you baby may need immunizations at 1 month of age. Make an appointment with your clinic. Do you need help finding a clinic for your baby’s follow up visits? If yes, contact your NP for help. ";
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        
        break;
    
      default:
        break;
    } 
  }

  


}

// Messages().find((item ) => { item.infatMessage
// });