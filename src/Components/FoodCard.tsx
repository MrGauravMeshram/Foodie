import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

type FoodCardProps = {
  image: any;
  title: string;
  restaurant: string;
  price: number;
};

const FoodCard = ({
  image,
  title,
  restaurant,
  price,
}: FoodCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode='contain' />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{restaurant}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>${price}</Text>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodCard

const styles = StyleSheet.create({
  card: {
    width: 180,
    alignSelf: "center",
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    margin: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#8B8B97',
    marginTop: 4,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D2D2D',
  },

  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F7931E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plus: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
  },
});

