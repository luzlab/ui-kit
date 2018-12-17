import {
  BackgroundColorProperty,
  ColorProperty,
  FlexFlowProperty,
  ListStylePositionProperty,
  ListStyleProperty,
  TextDecorationColorProperty,
  TextDecorationProperty,
  TextTransformProperty,
  TransformProperty,
} from 'csstype';

export interface IColorProps {
  color?: ColorProperty;
  backgroundColor?: BackgroundColorProperty;
}

export const color = (props: IColorProps) => ({
  color: props.color,
  backgroundColor: props.backgroundColor,
});

export interface ITextDecorationProps {
  textDecoration?: TextDecorationProperty;
  textDecorationColor?: TextDecorationColorProperty;
}

export const textDecoration = (props: ITextDecorationProps) => ({
  textDecoration: props.textDecoration,
  textDecorationColor: props.textDecorationColor,
});

export interface ITextTransformProps {
  textTransform?: TextTransformProperty;
}

export const textTransform = (props: ITextTransformProps) => ({
  textTransform: props.textTransform,
});

export interface IListStyleProps {
  listStyle?: ListStyleProperty;
  listStylePosition?: ListStylePositionProperty;
}

export const listStyle = (props: IListStyleProps) => ({
  listStyle: props.listStyle,
  listStylePosition: props.listStylePosition,
});

export interface ITransformProps {
  transform?: TransformProperty;
}

export const transform = (props: ITransformProps) => ({
  transform: props.transform,
});

export interface IFlexFlowProperty {
  flexFlow?: FlexFlowProperty;
}

export const flexFlow = (props: IFlexFlowProperty) => ({
  flexFlow: props.flexFlow,
});