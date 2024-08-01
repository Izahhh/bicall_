import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const BtnVer = ({
  vERIFICAR,
  cHAMADA,
  logotipo3,
  propMarginTop,
  propMarginLeft,
  propWidth,
  propHeight,
}) => {
  const navigation = useNavigation(); // Define navigation here

  const btnVerStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
    };
  }, [propMarginTop, propMarginLeft]);

  const logotipo3IconStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth),
      ...getStyleValue("height", propHeight),
    };
  }, [propWidth, propHeight]);

  return (
    
      <TouchableOpacity
       style={[styles.btnver, btnVerStyle]}
       onPress={() => navigation.navigate('VerificarAluno')}>
        <View style={styles.blocoazulver} />
        <Text style={[styles.verificar, styles.chamadaTypo]}>{vERIFICAR}</Text>
        <Text style={[styles.chamada, styles.chamadaTypo]}>{cHAMADA}</Text>
        <Image
          style={[styles.logotipo3Icon, logotipo3IconStyle]}
          contentFit="cover"
          source={logotipo3}
        />
      </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  chamadaTypo: {
    height: 44,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    marginLeft: -65.5,
    width: 131,
    left: "50%",
    position: "absolute",
  },
  blocoazulver: {
    marginTop: -72,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDeepskyblue,
    height: 131,
    marginLeft: -65.5,
    width: 131,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  verificar: {
    top: 13,
  },
  chamada: {
    top: 100,
  },
  logotipo3Icon: {
    top: 33,
    left: 35,
    width: 63,
    height: 60,
    position: "absolute",
  },
  btnver: {
    marginTop: -154,
    marginLeft: 17,
    height: 144,
    width: 131,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
});

export default BtnVer;
