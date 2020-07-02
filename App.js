import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Linking,
  Share
} from "react-native";

const { width, height } = Dimensions.get('window');
console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    news: [],
    loading: true,
  };

  fetchnews = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=f53cea5cdabf4f74a4fec815335a2425"
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          news: response.articles,
          loading: false,
        });
      });
  };
  componentDidMount() {
    this.fetchnews();
  }


  shredical = async article =>{
try {
  await Share.share({
    message: 'Checkout this article' + article
  })
} catch (error) {
  console.log(error)
}
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Top</Text>
            <Text style={styles.headerText}>HeadLing</Text>
          </View>

          <View style={styles.news}>
            <FlatList
              data={this.state.news}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback onPress={()=> Linking.openURL(item.url)}>
                  <View style={styles.box}>
                    <Image
                      source={{ uri : item.urlToImage }}
                      style={[StyleSheet.absoluteFill,{borderRadius:15}]}
                    />
                    <View style={styles.gradient}>
                      <Text style={styles.gradientText}>{item.title}</Text>
                      <Text style={styles.gradientShare} onPress={()=>this.shredical(item.url)}>Share</Text>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  header: {
    padding: 30,
  },
  headerText: {
    fontSize: 25,
    color: "#fff",
  },
  news: {
    alignSelf: "center",
    flex:1,
  },
  box: {
    width: width - 50,
    height: 200,
    flex:1,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius:15
  },
  gradient: {
    width: "100%",
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:15
  },
  gradientText:{
    position:'absolute',
    bottom:0,
    color:'#fff',
    fontSize:20,
    padding:5
  },
  gradientShare:{
    color:'#fff',
    fontSize:16,
    position:'absolute',
    top:0,
    right:0,
    padding:5,
    fontWeight:'bold'
  }
});
