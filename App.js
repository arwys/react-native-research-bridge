import React, {useState} from 'react';
import {
  View,
  NativeModules,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// import TurboModules from './NativeModules/jsi';
const {ConverterFunctionModule, PythonModule} = NativeModules;
const renderImage = uri => {
  return (
    uri !== '' && (
      <Image
        resizeMode="contain"
        source={{
          uri: 'file:////' + uri,
          width: 300,
          height: 300,
        }}
      />
    )
  );
};

// console.log(b);
const x = [80, 70, 40, 10];
const y = [12, 14, 18, 18];
// const time = new Date().getTime().toString();
const App = () => {
  const [uri, setUri] = useState('');

  //Java Bridge

  const onPress = () => {
    ConverterFunctionModule.createFunction('testName', 'testLocation');
  };

  const returnFromNative = async () => {
    try {
      const data = await ConverterFunctionModule.returnFromNative(
        'Party',
        'My House',
      );
      // console.log(`Created a new event with id ${data}`);
    } catch (e) {
      return;
    }
  };

  //Python Bridge
  const returnFromPython = async () => {
    try {
      const data = await PythonModule.returnFromPython('12', '16');
      // console.log(`returning  ${data}`);
    } catch (e) {
      return;
    }
  };
  const invokePython = () => {
    PythonModule.InvokePython();
  };

  const passingToPython = async () => {
    try {
      const data = await PythonModule.passingToPython('200', '167');
      console.log(`passing and return from python ${data}`);
    } catch (e) {
      console.log(e);
    }

    try {
      const b = PythonModule.convertImageFromBitmap(
        'android.graphics.Bitmap@e4e34df',
      );
      console.log(b);
    } catch (error) {
      console.log('first', error);
    }
  };
  // console.log(uri);

  const generateMathplotlib = async () => {
    try {
      const data = await PythonModule.generateMathplotlib();
      // console.log(data, 'Bitmap');
    } catch (error) {
      return;
    }
  };

  const processMathPlotlib = async () => {
    setUri('');
    try {
      const data = await PythonModule.processMathplotlib(
        x.toString(),
        y.toString(),
      );
      setUri(data);

      // console.log(data, 'data file');
    } catch (error) {
      return;
    }
  };

  const plot3DGraph = async script => {
    setUri('');
    try {
      const data = await PythonModule.plot3D(script);
      setUri(data);

      // console.log(data, 'data file');
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  // // C++ JSI
  // const invokeJSI = () => {
  //   const message = TurboModules.getString('name', 'data');
  //   console.log(message);
  // };
  return (
    <ScrollView>
      {uri == null && <ActivityIndicator size={'small'} color="blue" />}
      <View style={styles.container}>{renderImage(uri)}</View>
      <Button title="Brdige to Java" onPress={onPress} />
      <View style={{height: 80}} />
      <Button title="Return from Java Native" onPress={returnFromNative} />
      <View style={{height: 80}} />
      <Button title="Invoke Python Script" onPress={invokePython} />
      <View style={{height: 80}} />
      <Button title="Returning from Python" onPress={returnFromPython} />
      <View style={{height: 80}} />
      <Button
        title="Pass data and get from Python File"
        onPress={passingToPython}
      />
      <View style={{height: 80}} />
      <Button title="Matplotlib" onPress={generateMathplotlib} />
      <View style={{height: 80}} />
      <Button title="Process Matplotlib" onPress={processMathPlotlib} />

      <View style={{height: 80}} />
      <Button title="Plot 3D" onPress={() => plot3DGraph('plotGraph')} />
      <View style={{height: 80}} />
      <Button
        title="Plot Contour"
        onPress={() => plot3DGraph('displayContour')}
      />
      {/* <View style={{height: 80}} />
      <Button title="Invoke JSI" onPress={invokeJSI} /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {width: '100%', justifyContent: 'center', alignItems: 'center'},
});
export default App;
