# Keeping Moms and Infants Healthy (nuMom) -- Mobile Application <version 3.0>

Authors: Eduardo Morales, Gabriel Alfonso, Michael Llanes, Noe Velasquez, Amin Sheikhnias, Jessica Gonzalez, Yonal Hernandez, David Antunez

Product Owner: Jean Hannan

This is the second version of the keeping Moms and Infants Healthy application that was built for Florida International University's CIS 4911 - Senior Project Course. A smartphone-based maternal/infant healthcare application (app), that provide support in 3 different languages (English, Spanish & Creole), designed for low-income minority mothers. The main purpose of the application in its current state is to provide early and continued access to health care for prenatal and postnatal mothers.



-------

### Project Structure

The following tree structure will be useful to visualize how the project is structured:



```

├── Code

│   └── React-Native-App

│       ├── assets

│       │   ├── icons

│       │   └── images

│       ├── functions (Cloud functions that serve as an API that lives in the Cloud)

│       ├── node_modules (inside here are all the modules installed after running ``npm install``)

│       └── src

│           ├── Components

│           │   └── components

│           ├── JSON files

│           └── documents

├── Documentation

├── Posters

├── PresentationSlides

└── Videos

```



All the functionality lies in the ```Code/React-Native-App``` directory. The rest of the directories that are in the root are solely for documentation purposes.



The root of the ```React-Native-App/src``` directory is where all the source code for the application lies. The main entrypoint of the application is through ```App.js```, which is where the application is created. To add new screens you must reference them in the ```App.js``` file and create a new navigation reference inside the navigators in this file.



Within the root of the ```React-Native-App``` directory is a file called ```package.json```, which defines the scripts that allows to run the application and contains meta-data about the project, in addition to defining the project dependencies.



Inside the root of the ```React-Native-App/src/functions``` directory is another ```package.json``` which defines the scripts to run the google cloud functions as well as the definitions of the dependencies used. To deploy new functions, you must be inside this directory and run ```firebase deploy --project moms-and-infants-healthy```, before this make sure to install firebase and firebase tools in this same directory, you can do so by running ```npm install --save firebase firebase-tools```





### Installation

**Note**: You must have npm as your dependency manager so that your environment runs similar to how the current development team runs their environment. Additionally, the ```expo cli``` package is used to be able to run the application on yur personal device. Use the following command in your terminal or shell emulator to install both:

```

npm install -g npm

npm install -g expo-cli

npm install expo

expo install

```



Clone the repository onto your machine using:

```

git clone <the link to the project>

```



Install the expo client on your mobile device or install the Android/Iphone simulator on your computer

iOS: https://apps.apple.com/app/apple-store/id982107779

Android: https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www

For more help visit the expo website: https://expo.io/learn



Ensure that you installed all the necessary dependencies for the project by running ```npm install``` in both the root of the ```React-Native-App``` and the ```React-Native-App/src/functions``` directories and the expo client on your personal device. Afterwards, you can run the command

```

npm start or expo start

```

in order to start the application. If using default settings, the expo cli will create a QR code that you can scan with the Expo Client  (Android) or the Camera (iOS) of your mobile device, expo will open the project on your personal device.You may have to wait a minute while your project bundles and loads for the first time. You can also run de the app on the emulator or simulator on your computer, for that you need to have the simulator installed and after you do ```npm start``` you will see instructions on how to run it on the simulator, but this is what you need to do

```

Press a for Android emulator, or i for iOS simulator.

```