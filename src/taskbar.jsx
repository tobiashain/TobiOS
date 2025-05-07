import "./taskbar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

export default function Taskbar(){
  return(
  <>
  <div className="taskbar">
    <div className="osButton"><FontAwesomeIcon icon={faWindows} size="2x"/></div>
    <div className="tabs"></div>
    <div className="settings"></div>
  </div>
  </>)
}