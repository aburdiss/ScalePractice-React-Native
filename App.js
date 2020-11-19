import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from 'react-native-dynamic'

import RandomScale from './src/Random/RandomScale';
import RandomArpeggio from './src/Random/RandomArpeggio';
import ScaleResources from './src/Resources/ScaleResources';
import ArpeggioResources from './src/Resources/ArpeggioResources';
import AdvancedScale from './src/Advanced/AdvancedScale';
import AdvancedArpeggio from './src/Advanced/AdvancedArpeggio';
import More from './src/More/More';
import ScaleDetail from './src/Resources/ScaleDetail';

import HeaderButton from './src/Components/HeaderButton';

import { colors } from './src/Model/Model';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translationGetters = {
  en: () => require('./src/Translations/en.json'),
  zh: () => require('./src/Translations/zh.json'),
  fr: () => require('./src/Translations/fr.json'),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  const fallback = { languageTag: 'en' }
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  translate.cache.clear()

  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


/**
 * @description The stack of screens for the Random Tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const RandomStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen 
        name="Random Scale Practice" 
        component={RandomScale}
        options={{
          headerRight: () => (
            <HeaderButton 
              handler={() => { navigation.navigate("Random Arpeggio Practice")}}
            >
              {translate("Arpeggios")}
            </HeaderButton>
          ),
          title: translate("Random Scale Practice")
        }}
      />
      <Stack.Screen 
        name="Random Arpeggio Practice" 
        component={RandomArpeggio}
        options={{
          title: translate("Random Arpeggio Practice"),
        }}
      />
    </Stack.Navigator>
  )
}


/**
 * @description The stack of screens for the resources tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const ResourcesStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen 
        name="Scale Resources" 
        component={ScaleResources}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Arpeggio Resources")}}
            >
              {translate("Arpeggios")}
            </HeaderButton>
          ),
          title: translate("Scale Resources"),
        }}
      />
      <Stack.Screen 
        name="Arpeggio Resources" 
        component={ArpeggioResources} 
        options={{
          title: translate("Arpeggio Resources"),
        }}
      />
      <Stack.Screen
        name="Scale Detail"
        component={ScaleDetail}
        options={({ route }) => ({ 
          title: translate(route.params.name),
        })}
      />
    </Stack.Navigator>
  );
}


/**
 * @description The stack of screens for the Advanced tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const AdvancedStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen 
        name="Advanced Scale Practice" 
        component={AdvancedScale}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Advanced Arpeggio Practice")}}
            >
              {translate("Arpeggios")}
            </HeaderButton>
          ),
          title: translate("Advanced Scale Practice"),
        }}
      />
      <Stack.Screen 
        name="Advanced Arpeggio Practice" 
        component={AdvancedArpeggio}
        options={{
          title: translate("Advanced Arpeggio Practice"),
        }}
      />
    </Stack.Navigator>
  );
}


/**
 * @description The stack of screens for the More tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const MoreStack = () => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen
        name="More"
        component={More}
        options={{
          title: translate("More"),
        }}
      />
    </Stack.Navigator>
  )
}

setI18nConfig();
/**
 * @description The main tab navigation of the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const App = () => {
  const DARKMODE = useDarkMode();

  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return (() => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    });
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig()
    .then(() => this.forceUpdate())
    .catch(error => {
    console.error(error)
    })
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Random') {
              iconName = 'md-cube';
            } else if (route.name === 'Resources') {
              iconName = 'md-book';
            } else if (route.name === 'Advanced') {
              iconName = 'md-create';
            } else if (route.name === 'More') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          inactiveTintColor: colors.systemGray,
          style: {
            backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
            borderTopColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          }
        }}>
        <Tab.Screen
          name="Random"
          component={RandomStack}
          options={{title: translate('Random')}}
          />
        <Tab.Screen
          name="Resources"
          component={ResourcesStack}
          options={{title: translate('Resources')}}
          />
        <Tab.Screen
          name="Advanced"
          component={AdvancedStack}
          options={{title: translate('Advanced')}}
          />
        <Tab.Screen 
          name="More"
          component={MoreStack} 
          options={{title: translate('More')}} 
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
