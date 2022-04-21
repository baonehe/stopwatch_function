
import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';

const Listitem=({time,id})=>{
  return(
      <View style={styles.LapText}>
          <View style={styles.lap}>
              <Text style={{alignItems:'center',fontSize:20}}>Lab #{id}</Text>
              <Text style={{alignItems:'center',fontSize:20}}>{formatTime(time)}</Text>
          </View>
      </View>
  );
};

const App = () => {
  const [startTime, setStartTime] = useState();
  const [timeElapsed, setTimeElapsed] = useState();
  const [running, setRunning] = useState(false);
  const [lab, setLab] = useState([]);
  const [id, setId] = useState(0);

  useEffect(()=>{
    let interval = null;
    if (running)
      interval= setInterval(()=> {
      setTimeElapsed(new Date()- startTime);
      setRunning(true);
    },10)
  else{
    clearInterval(interval);
  }
  return () => clearInterval(interval)
},[running,timeElapsed]);
  const HandleStartPress=() =>{
   setStartTime(new Date());
   if(running){
     setRunning(false);
     return;
   }
   else{
     setRunning(true);
     return;
   }
   
  }

  const HandleLabPress = () => {
    setLab([...lab, { id: id + 1, time: timeElapsed }]);
    setStartTime(new Date());
    setId(id + 1);
  }


  const renderItem = ({ item }) => (
    <Listitem time={item.time} id={item.id}></Listitem>
  );

  return (
    <View >
      <View style={styles.timer}>
        <Text 
        style={{ fontSize: 80, color: 'black' }}>
          {formatTime(timeElapsed)}
        </Text>
      </View>
      <View style={styles.ButtonWrapper}>
        <TouchableHighlight 
          underlayColor="#FF0041" style={styles.buttonlap} onPress={() => HandleLabPress()}>
          <Text style={{ fontSize: 18, color: 'black' }}>Lab</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonStart} underlayColor="#3CE500" onPress={() => HandleStartPress()}>
          <Text style={{ fontSize: 18, color: 'black' }}>Start/Pause</Text>
        </TouchableHighlight>
      </View>
      <FlatList
        data={lab}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lap:{
    height:70,
    width:'90%',
    marginTop:30,
    alignContent:'center',
    borderColor:'black',
    borderWidth:1,
    borderRadius:10,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
},
  ButtonWrapper:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  timer: {
    marginTop: 80,
    alignItems: 'center'
  },
  buttonlap: {
    height: 100,
    width: 100,
    borderWidth:2,
    opacity:0.5,
    borderRadius: 60,
    backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStart:{
    height: 100,
    width: 100,
    borderWidth:2,
    borderRadius: 60,
    opacity:0.5,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center'
  },
  LapText:{
    alignItems:'center',
    fontSize:25,
  }
});



export default App;
