import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => getData(), []);

  const getData = () => {
    fetch('https://www.amiiboapi.com/api/amiibo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setFilteredDataSource(json.amiibo);
        setMasterDataSource(json.amiibo);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.flatlistContainer}
          onPress={() =>
            navigation.navigate('Detail', {
              series: item.amiiboSeries,
              char: item.character,
              img: item.image,
              gameSrs: item.gameSeries,
              name: item.name,
            })
          }>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            {item.character}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.character ? item.character : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <SearchBar
            round
            searchIcon={{size: 24}}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Enter a name..."
            value={search}
          />
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorView}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  buttonContainer: {
    color: 'white',
    margin: 10,
  },
  footerLoader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
