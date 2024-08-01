import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const BtnAtu = ({
  aTualizar,
  logotipo2,
  propMarginTop,
  propMarginLeft,
  propLeft,
}) => {
  const navigation = useNavigation();

  const btnAtuStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
    };
  }, [propMarginTop, propMarginLeft]);

  const logotipo2IconStyle = useMemo(() => {
    return {
      ...getStyleValue("left", propLeft),
    };
  }, [propLeft]);

  return (
    <TouchableOpacity
      style={[styles.btnatu, btnAtuStyle]}
      onPress={() => navigation.navigate('AtualizarAluno')}
    >
      <View style={styles.blocoazulatu} />
      <Text style={[styles.atualizar, styles.alunoTypo]}>{aTualizar}</Text>
      <Text style={[styles.aluno, styles.alunoTypo]}>ALUNO</Text>
      <Image
        style={[styles.logotipo2Icon, logotipo2IconStyle]}
        contentFit="cover"
        source={logotipo2}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  alunoTypo: {
    height: 44,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    width: 131,
    left: "50%",
    position: "absolute",
  },
  blocoazulatu: {
    marginTop: -72,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDeepskyblue,
    height: 131,
    width: 131,
    marginLeft: -64.5,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  atualizar: {
    top: 13,
    marginLeft: -64.5,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
  },
  aluno: {
    marginLeft: -66.5,
    top: 100,
  },
  logotipo2Icon: {
    top: 35,
    left: 40,
    width: 61,
    height: 60,
    position: "absolute",
  },
  btnatu: {
    marginTop: -154,
    marginLeft: -147,
    width: 133,
    height: 144,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
});

export default BtnAtu;
