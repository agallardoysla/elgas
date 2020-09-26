import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput,TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Container from '../../generales/Container';
import BasicHeader from '../../components/Header/BasicHeader'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colores } from '../../constantes/Temas';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native'

const Product = ({}) => {
    const [basket, setBasket] = useState(1)
    const navigation = useNavigation()
    const localApiResponse = [
        {
            product:{
                id:'1',
                name:'Cilindro Auzul',
                photo_url:'https://static.vecteezy.com/system/resources/previews/000/681/883/non_2x/3d-gas-or-propane-tank.jpg',
                order_id:1,
                descirption:{
                    capacity:15, 
                    unity:'kg',
                    description:'Cilindro de gas de 15Kg para el hogar.'
                },
                price: 1.60
            },
            category:{
                id:'0',
                name:'Cilindro',
                description:'',
                order_id:0
            }
        },
        {
            product:{
                id:'1',
                name:'Cilindro Verde',
                photo_url:'https://thumbs.dreamstime.com/b/un-cilindro-de-gas-37071083.jpg',
                order_id:1,
                descirption:{
                    capacity:45, 
                    unity:'g',
                    description:'Cilindro de gas de 45g para el hogar.'
                },
                price: 1.55
            },
            category:{
                id:'0',
                name:'Cilindro',
                description:'',
                order_id:0
            }
        },
        {
            product:{
                id:'3',
                name:'Válvula',
                photo_url:'https://regaber.com/wp-content/uploads/2019/04/ValvulaCompuerta_AsientoElastico_Gaer_Regaber_01.jpg',
                order_id:3,
                descirption:{
                    description:'Válvula de gran capacidad.'
                },
                price: 0.90
            },
            category:{
                id:'1',
                name:'Accesorio',
                description:'',
                order_id:1
            }
        }
    ]
    const CenterComponet = () => {
        return(
            <Image source={require('../../../assets/img/logo.png')} style={{width:wp(10), height:hp(5), alignSelf:'center'}} />
        )
    }
    const RightComponent = () => {
        return(
            <>
                <View style={{flexDirection:'row'}} >
                    <View style={{backgroundColor:colores.amarillo, width:wp(3.5), height:hp(1.9), top:hp(0.5), borderRadius:wp(100), justifyContent:'center'}} >
                        <Text style={{textAlign:'center', fontSize:RFPercentage(1.5)}} >{basket}</Text>
                    </View>
                    <Image source={require('../../../assets/img/Basket.png')} style={{width:wp(7.5), height:hp(3.5), alignSelf:'center'}} />
                </View>
            </>
        )
    }
    
    return(
        <Container>
            <BasicHeader title='Direccion de entrga' icon={require('../../../assets/img/SearchIcon.png')} centerComponent={()=>CenterComponet()} rigthComponent={()=>RightComponent()} />
            <View style={{marginTop:hp(5),   }} >
                <Text style={{textAlign:'center', fontSize:RFPercentage(3), fontWeight:'bold'}} >¡Hola!</Text>
                <Text style={{textAlign:'center', fontSize:RFPercentage(2.5)}} >¿Qué deseas comprar hoy?</Text>
            </View>
            <View style={{marginTop:hp(5), }} >
                <ImageCarrousel/>
            </View>
            <View style={{flex:1, marginTop:hp(5)}} >
                <View style={{backgroundColor:'#eee', width:wp(100), height:hp(5), justifyContent:'center'}} >
                    <Text style={{textAlign:'center', fontSize:RFPercentage(2.5), fontWeight:'bold'}} >Cilindros de gas</Text>
                </View>
                <View style={{marginTop:hp(2)}} >
                    <ScrollView horizontal style={{alignSelf:'center'}} >
                        {
                            localApiResponse.filter(value => value.category.name === 'Cilindro').map((value, index)=>{
                                return(
                                    <TouchableOpacity onPress={()=>navigation.navigate('ProductInfo',{item: value})} key={index} style={{marginLeft:wp(index>0?5:0)}} >
                                        <Image source={{uri: value.product.photo_url}} style={{width:wp(10), height:hp(8)}} />
                                        <Text style={{textAlign:'center', fontSize:wp(3.3), marginTop:hp(0.3), fontWeight:'bold'}} >{value.product.descirption.capacity}{value.product.descirption.unity}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{backgroundColor:'#eee', width:wp(100), height:hp(5), justifyContent:'center', marginTop:hp(1)}} >
                    <Text style={{textAlign:'center', fontSize:RFPercentage(2.5), fontWeight:'bold'}} >Accesorios</Text>
                </View>
                <View style={{marginTop:hp(2)}} >
                    <ScrollView horizontal style={{alignSelf:'center'}} >
                        {
                            localApiResponse.filter(value => value.category.name === 'Accesorio').map((value, index)=>{
                                return(
                                    <TouchableOpacity onPress={()=>navigation.navigate('ProductInfo',{item: value})} key={index} style={{marginLeft:wp(index>0?5:0)}} >
                                        <Image source={{uri: value.product.photo_url}} style={{width:wp(10), height:hp(8)}} />
                                        <Text style={{textAlign:'center', fontSize:wp(3.3), marginTop:hp(0.3), fontWeight:'bold'}} >{value.product.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Container>
    )
}

const ImageCarrousel = ({image=require('../../../assets/img/CancelButton.png'), title='tittle', press}) =>{
    return(
        <TouchableOpacity style={{justifyContent:'center', width:wp(18)}} >
            <ImageBackground source={{uri:'https://i.pinimg.com/originals/61/56/21/615621dc25f20260922e993d6bfac872.png'}} style={{width:wp(100), height:hp(22), justifyContent:'center'}} >
                <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:wp(9)}} >
                    <TouchableOpacity>
                        <Image source={require('../../../assets/img/BackButton.png')} style={{tintColor:'#000', width:wp(6), height:hp(3)}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../../assets/img/BackButton.png')} style={{tintColor:'#000', width:wp(6), height:hp(3), transform:[{rotate:'180deg'}]}} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
    {/* <Image source={image} style={{overlayColor:'#000', tintColor:'#000', width:wp(10), height:hp(5), alignSelf:'center'}} />
    <Text style={{fontSize:RFPercentage(2), textAlign:'center'}} >{title} </Text> */}
}


export default Product