// // @flow
// /* eslint-disable no-undefined */
// import React from "react";
// import { TouchableOpacity, ImageBackground } from "react-native";
// import { Card, Caption, Subtitle, View } from "@shoutem/ui";

// type PropsType = { item: Object, onPress: ()=>void };

// export const CelebrationLocation = ({ item, onPress }: PropsType): React$Element<any> => (
//     <TouchableOpacity
//         onPress={ onPress }
//         styleName="flexible">
//         <Card>
//             <ImageBackground
//                 style={ { width: "100%", height: "75%" } }
//                 source={ { uri: item.image } }
//             />
//             <View styleName="content">
//                 <Subtitle>{ item.name }</Subtitle>
//                 <Caption>{ item.townName }</Caption>
//             </View>
//         </Card>
//     </TouchableOpacity>
// );