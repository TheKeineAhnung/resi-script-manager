## Add a script

### The script

Each script is located in its own folder in the `scripts` folder. A template for a new script can be found there in the `template` folder. The script is written into the given function. The function must have the same name as the folder, so that the scripts can be easily identified!

### Make the script available

#### Type modifications

First, the script name must be made available in the `ScriptName` type. To do this, follow the steps below:

1. open the `types` folder in the `src` folder
1. open there the file `ScriptName.d.ts`
1. add the name of the folder of your script to the `ScriptName` type. **Please keep the alphabetical sorting**

#### Add information

Now you have to store the information for the script. Follow the steps below:

1. open the folder `data` in the `src` folder
1. open there the file `scriptInfo.ts`
1. add your script in the `info` array. **Please keep the alphabetical sorting**. The parameters are explained [here](#the-parameters).

Furthermore the script must be completed in a file, so that it can be loaded. For this the `scripts.ts` file in the `scripts` folder must be opened. Here the following steps must be followed:

1. import the script from the folder where you created it. **Please keep the alphabetical sorting**
1. add the imported script to the export object. **Please keep the alphabetical sorting**

##### The parameters

1. name: specifies the name of the folder where the script is located
1. displayName: specifies the name which will be displayed to the user
1. description: Specifies a description which will be displayed to the user
1. author: add here the name of the script author, so we can show him recognition
1. category: Specifies one of the default categories in which the script will be placed. The development environment should suggest the different categories that can be used. Alternatively, the script categories can be found in the `ScriptCategory.ts` file, in the `types` folder, where the script name has already been stored.
1. usable: Indicates whether the script can be used.
1. match: Specifies on which pages of the game the script can be used.
1. oneTime: Specifies whether the script is executed every time a page is loaded, or only once when it is loaded for the first time.
1. requiresConfig: Specifies whether the script requires configuration.
1. config: **Only usable if the `requiresConfig` parameter is set to `true`**. The parameter takes an object, which itself assigns an object to each key. As key is used, with which key the data should be stored in the localStorage. The data can then be used in the script. The content of the object there are three parameters:
   1. type: Takes the type of the configuration. The available types are either suggested by the development environment, or alternatively can be viewed in the `SettingTypes.d.ts` file in the `types` folder.
   1. default: Specifies the default value of the configuration. The specified value should be of the same type as the `type` parameter.
   1. description: Specifies a description for the configuration which will be displayed to the user.


Translated with www.DeepL.com/Translator (free version)