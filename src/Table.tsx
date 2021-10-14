import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, FlexStyle} from 'react-native';

interface Props {
  head: JSX.Element[];
  headViewStyle?: StyleProp<ViewStyle>[];
  body: (JSX.Element | ((a: {widths: number[]}) => JSX.Element))[][];
  containerStyle?: StyleProp<ViewStyle>;
}

const Tabel: React.FC<Props> = props => {
  const [widths, changeWidths] = useState<number[]>(
    new Array(props.head.length).fill(0),
  );
  const renderHead = useCallback(() => {
    return (
      <View
        style={[
          styles.row,
          {
            borderBottomColor: (props.containerStyle as ViewStyle).borderColor,
            borderBottomWidth: (props.containerStyle as FlexStyle).borderWidth,
          },
        ]}>
        {props.head.map((ele, i) => {
          const colStyle = [];
          if (props.containerStyle && i !== props.head.length - 1) {
            colStyle.push({
              borderEndColor: (props.containerStyle as ViewStyle).borderColor,
              borderEndWidth: (props.containerStyle as FlexStyle).borderWidth,
            });
          }
          console.log('colStyle', colStyle);

          return (
            <View
              onLayout={event => {
                const wids = widths.slice(0);
                wids[i] = event.nativeEvent.layout.width;
                changeWidths(wids);
              }}
              style={[...colStyle, props.headViewStyle?.[i]]}
              key={i}>
              {React.cloneElement(ele)}
            </View>
          );
        })}
      </View>
    );
  }, [widths, props]);
  const renderBody = useCallback(() => {
    console.log('widyhs', widths);
    return (
      <View>
        {props.body.map((eles, index) => {
          return (
            <View key={index} style={[styles.row]}>
              {eles.map((ele, i) => {
                let element = typeof ele === 'function' ? ele({widths}) : ele;
                const colStyle = [];
                if (props.containerStyle && i !== props.head.length - 1) {
                  colStyle.push({
                    borderEndColor: (props.containerStyle as ViewStyle)
                      .borderColor,
                    borderEndWidth: (props.containerStyle as FlexStyle)
                      .borderWidth,
                  });
                }
                return (
                  <View
                    style={[
                      styles.row,
                      {
                        width: widths[i],
                      },
                      ...colStyle,
                    ]}
                    key={i}>
                    {React.cloneElement(element)}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }, [props, widths]);
  return (
    <View style={props.containerStyle}>
      {/*border的逻辑未完成，组件未测试*/}
      {renderHead()}
      {renderBody()}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
export default Tabel;
