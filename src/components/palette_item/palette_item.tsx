import * as React from "react";
import * as models from "../../models/shapes.ts";
import * as classNames from "classnames";
import {Circle} from "../shapes/Circle.tsx";
import {Square} from "../shapes/Square.tsx";
import {Triangle} from "../shapes/Triangle.tsx";
import {ConnectDragSource} from "react-dnd";


export interface PaletteItemProps {
  shapeModel: any;
  shapeColor?: string;
  isDragging?: boolean;
  isPreview?: boolean;
  connectDragSource?: ConnectDragSource;
}

export class PaletteItem extends React.Component<PaletteItemProps, {}> {
  render() {
    const classes = classNames("palette-item", {"palette-item--dragging": !!this.props.isDragging, "palette-item-preview": !!this.props.isPreview});
    const html = <div className={classes}>
      <svg width={50} height={50}>
        {this.renderShape(this.props.shapeModel, this.props.shapeColor) }
      </svg>
    </div>;
    return this.props.connectDragSource ? this.props.connectDragSource(html) : html;
  }

  private renderShape(shapeModel: any, shapeColor: string) {
    const shapeInstance = new shapeModel(25, 25, 50, shapeColor);
    if (shapeInstance instanceof models.Circle) {
      return <Circle shape={shapeInstance} />;
    } else if (shapeInstance instanceof models.Square) {
      return <Square shape={shapeInstance} />;
    } else if (shapeInstance instanceof models.Triangle) {
      return <Triangle shape={shapeInstance} />;
    }
  }
}