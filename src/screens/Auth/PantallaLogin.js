import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import ElGasLogo from "../../components/Icons/ElGasLogo";
import EmailIcon from "../../components/Icons/EmailIcon";
import FbIcon from "../../components/Icons/FbIcon";
import LockIcon from "../../components/Icons/LockIcon";
import { colores, pantalla } from "../../constantes/Temas";
import Container from "../../generales/Container";
import useForm from "../../hooks/useForm";
import { ValidateForm } from "../../functions/ValidateForm";
import { getCollection, logIn, loginState, logout } from "../../apis/querys";
import { connect, useDispatch } from "react-redux";
import { actions } from "../../redux/index";
import { facebookLogIn } from "../../apis/AccountsLogin";
import { firebaseApp } from "../../apis/firebase";

const initialValues = {
  email: "",
  password: "",
};

const PantallaLogin = (props) => {
  const form = useForm({ initialValues });
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const fbLogin = async () => {
    const response = await facebookLogIn();
    if (response) {
    }
    console.log("Facebook", response);
  };

  const onLogin = () => {
    const { email, password } = form.fields;
    setloading(true);
    console.log("PantallaLogin", "Iniciando Login");
    if (ValidateForm(form)) {
      logIn("ll@gmail.com", "123456").then(async (x) => {
        if (x.type == "error") {
          onLogin();
        } else {
          console.log("PantallaLogin x.type", x.type);
          setloading(false);
        }
      });
    } else {
      setloading(false);
      Alert.alert("Todos los campos son obligatorios");
    }
  };

  return (
    <Container
      isloading={loading}
      styleContainer={styles.screen}
      footer={false}
    >
      <View
        style={[
          styles.logo,
          { marginTop: pantalla.screenHeight <= 592 ? 50 : 125 },
        ]}
      >
        <ElGasLogo height="100%" width="100%" />
      </View>
      <Text style={styles.textoBienvenido}>Bienvenido</Text>

      <View style={styles.controles}>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 14,
              width: 25,
              justifyContent: "center",
            }}
          >
            <EmailIcon width="100%" height="100%" color={colores.amarillo} />
          </View>
          <TextInput
            style={[
              {
                width: "80%",
                height: "60%",
                color: "#FFFFFF",
                borderBottomColor: "#FFFFFF",
                borderBottomWidth: 1,
                marginLeft: 5,
                marginBottom: 5,
                fontSize: RFPercentage(2.2),
              },
            ]}
            placeholder="E-mail"
            keyboardType="email-address"
            {...form.getInput("email")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 60,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              justifyContent: "center",
            }}
          >
            <LockIcon height="100%" width="100%" />
          </View>
          <TextInput
            style={[
              {
                width: "80%",
                height: "60%",
                color: "#FFFFFF",
                borderBottomColor: "#FFFFFF",
                borderBottomWidth: 1,
                marginLeft: 5,
                fontSize: RFPercentage(2.2),
              },
            ]}
            placeholder="Password"
            secureTextEntry
            {...form.getInput("password")}
          />
        </View>
      </View>

      <View style={styles.contenedor}>
        <Button color="#fff" style={{ marginBottom: 10 }} onPress={onLogin}>
          <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            Ingresar
          </Text>
        </Button>
        <Button color="#227BC4" horizontal onPress={fbLogin}>
          <View
            style={{
              width: "10%",
              height: "100%",
              marginLeft: 25,
              justifyContent: "center",
            }}
          >
            <FbIcon height={"35%"} width={"35%"} />
          </View>
          <View style={{ width: "90%", marginLeft: 5 }}>
            <Text style={{ fontSize: RFPercentage(2.2), color: "#fff" }}>
              Continuar con Facebook
            </Text>
          </View>
        </Button>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ marginVertical: 10 }}
            onPress={() => props.navigation.navigate("Registrarse")}
          >
            <Text style={{ color: "#fff" }}>
              ¿No tienes una cuenta? Créala aquí
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("RecuperarContrasena")}
          >
            <Text style={{ color: "#fff" }}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar barStyle="light-content" />
    </Container>
  );
};

const Button = (props) => {
  let TouchableComponent = TouchableOpacity;
  //const {onPress=()=>{}}= props

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View
      style={[
        {
          height: 40,
          width: "75%",
          borderRadius: 30,
          borderWidth: 1,
          overflow:
            Platform.OS === "android" && Platform.Version >= 21
              ? "hidden"
              : "visible",
          backgroundColor: props.color,
          borderColor: "transparent",
        },
        props.style,
      ]}
    >
      <TouchableComponent
        onPress={() => {
          props.onPress();
        }}
        activeOpacity={0.6}
      >
        <View
          style={
            !props.horizontal
              ? {
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }
          }
        >
          {props.children}
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colores.bgOscuro,
  },
  logo: {
    width: "100%",
    height: "20%",
    marginTop: 50,
  },
  textoBienvenido: {
    fontSize: RFPercentage(3),
    color: "#fff",
  },
  controles: {
    width: "90%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  contenedor: {
    height: "30%",
    width: "90%",
    alignItems: "center",
  },
});
export default connect()(PantallaLogin);
