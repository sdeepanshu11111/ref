import { PlacehoderUserInCircle } from "../../assets/Icons/PlacehoderUserInCircle";
import { PersonliseIcon } from "../../assets/Icons/PersonliseIcon";
import { WelcomeIconinCircle } from "../../assets/Icons/WelcomeIconinCircle";
import { EmailIconInCircle } from "../../assets/Icons/EmailIconInCircle";
import { CompletedInCircle } from "../../assets/Icons/CompletedInCircle";
import { ContactIconInCircle } from "../../assets/Icons/ContactIconInCircle";

  export let items = [
    {
      title: (
        <div>
          Your details
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <PlacehoderUserInCircle />,
      className: "step-container",
      description: "Provide an email & password",
    },
    {
      title: (
        <div>
          Verify your email
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <EmailIconInCircle />,
      className: "step-container",
      description: "Enter your verification code",
    },
    {
      title: (
        <div>
          Personalize your account
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <PersonliseIcon />,
      className: "step-container",
      description: "Help us personalize your journey",
    },
    {
      title: (
        <div>
          Welcome to vFulfill
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <WelcomeIconinCircle />,
      className: "step-container",
      description: "Automate your eCommerce operations",
    },
  ];
  export let itemsContacts= [
    {
      title: (
        <div>
          Your details
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <PlacehoderUserInCircle />,
      className: "step-container",
      description: "Provide an email & password",
    },
    {
      title: (
        <div>
       Complete sign up
          <span className="complete-icon-container">
          <CompletedInCircle />
          </span>
        </div>
      ),
      icon:  <ContactIconInCircle />,
      className: "step-container",
      description: "Enter your phone number",
    },
    {
      title: (
        <div>
          Personalize your account
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <PersonliseIcon />,
      className: "step-container",
      description: "Help us personalize your journey",
    },
    {
      title: (
        <div>
          Welcome to vFulfill
          <span className="complete-icon-container">
            <CompletedInCircle />
          </span>
        </div>
      ),
      icon: <WelcomeIconinCircle />,
      className: "step-container",
      description: "Automate your eCommerce operations",
    },
  ];