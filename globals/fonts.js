import {useFonts} from 'expo-font'

const OpenSans = () => {
    const [loaded] = useFonts({
        'OpenSans-Regular': require('../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
        'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf'),
    });

    return loaded;
}

export default OpenSans;