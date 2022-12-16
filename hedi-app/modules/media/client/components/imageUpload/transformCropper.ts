import React from "react";
import { Coordinate, Position, Rect } from "./types";

export const transformCropper = (
  cropContainerRef: React.RefObject<HTMLDivElement>,
  cropboxRef: React.RefObject<HTMLDivElement>,
  previewContainerRef: React.RefObject<HTMLDivElement>,
  cropboxRect: Rect,
  ratio?: number
) => {
  let isDragging = false;
  let isResizing = false;
  let currentCropHandlerKey: Position = Position.NONE;
  let oldPoint: Coordinate = { x: 0, y: 0 };
  const minWidth = Math.min(
    previewContainerRef.current?.getBoundingClientRect().width || 50,
    previewContainerRef.current?.getBoundingClientRect().height || 50,
    50
  );
  const minHeight = minWidth / (ratio ?? 1);

  const startCoordinator: Coordinate = {
    x: cropboxRect.x,
    y: cropboxRect.y,
  };
  const oldLocation: Coordinate = {
    x: 0,
    y: 0,
  };
  const endCoordinator: Coordinate = {
    x: cropboxRect.x + cropboxRect.width,
    y: cropboxRect.y + cropboxRect.height,
  };

  const containerMouseMove = (
    clientX: number,
    clientY: number,
    positionType?: Position
  ) => {
    if (isResizing) {
      const newPoint: Coordinate = {
        x: getRelativeX(clientX, cropContainerRef?.current),
        y: getRelativeY(clientY, cropContainerRef?.current),
      };
      adjust(oldPoint, newPoint, positionType);
      oldPoint = { ...newPoint };
    }
  };

  const getBoundedLeft = (left: number) => {
    left = Math.max(left, 0);
    if (cropboxRef.current && previewContainerRef.current) {
      const cropWidth = cropboxRef.current?.getBoundingClientRect().width;
      const containerWidth = previewContainerRef.current?.getBoundingClientRect()
        .width;
      if (left + cropWidth > containerWidth) left = containerWidth - cropWidth;
    }
    left = Math.max(left, 0);
    return left;
  };

  const getBoundedTop = (top: number) => {
    top = Math.max(top, 0);
    if (cropboxRef.current && previewContainerRef.current) {
      const cropHeight = cropboxRef.current?.getBoundingClientRect().height;
      const containerHeight = previewContainerRef.current?.getBoundingClientRect()
        .height;
      if (top + cropHeight > containerHeight)
        top = containerHeight - cropHeight;
    }
    top = Math.max(top, 0);
    return top;
  };

  const isNewWidthAndHeightOutOfBox = (
    top: number,
    left: number,
    width: number,
    height: number
  ) => {
    if (previewContainerRef.current) {
      const containerRect = previewContainerRef.current?.getBoundingClientRect();
      return (
        top + height > containerRect.height ||
        left + width > containerRect.width
      );
    }
    return true;
  };

  const getRelativeX = (clientX: number, relatedTo: HTMLDivElement | null) => {
    const boxX = relatedTo?.getBoundingClientRect()?.left || 0;
    return clientX - boxX;
  };
  const getRelativeY = (clientY: number, relatedTo: HTMLDivElement | null) => {
    const boxY = relatedTo?.getBoundingClientRect()?.top || 0;
    return clientY - boxY;
  };

  const move = (clientX: number, clientY: number) => {
    const boxX = cropContainerRef
      ? cropContainerRef.current?.getBoundingClientRect().left || 0
      : 0;
    const boxY = cropContainerRef
      ? cropContainerRef.current?.getBoundingClientRect().top || 0
      : 0;
    endCoordinator.x = clientX - boxX;
    endCoordinator.y = clientY - boxY;
    relocation();
  };
  const getNewSizeWithMovements = (
    movementX: number,
    movementY: number,
    currentWidth: number,
    currentHeight: number,
    isBottomRight: boolean = false
  ) => {
    if (ratio) {
      const isWidthChangeBigger =
        Math.abs(movementX) >= Math.abs(movementY) && movementX != 0;
      let newWidth = 0,
        newHeight = 0;
      if (isWidthChangeBigger) {
        newWidth = currentWidth - movementX * (isBottomRight ? -1 : 1);
        newHeight = newWidth / ratio;
      } else {
        newHeight = currentHeight - movementY * (isBottomRight ? -1 : 1);
        newWidth = newHeight * ratio;
      }

      return { width: newWidth, height: newHeight };
    }
  };
  const adjust = (start: Coordinate, stop: Coordinate, position?: Position) => {
    const movementX = stop.x - start.x;
    const movementY = stop.y - start.y;
    let top = parseInt(cropboxRef.current?.style.top ?? "0");
    let left = parseInt(cropboxRef.current?.style.left ?? "0");
    let width = parseInt(cropboxRef.current?.style.width ?? "0");
    let height = parseInt(cropboxRef.current?.style.height ?? "0");
    switch (position) {
      case Position.TOP:
        top += movementY;
        height -= movementY;
        if (ratio) {
          width = height * ratio;
        }
        break;
      case Position.BOTTOM:
        height += movementY;
        if (ratio) {
          width = height * ratio;
        }
        break;
      case Position.LEFT:
        left += movementX;
        width -= movementX;
        if (ratio) {
          height = width / ratio;
        }
        break;
      case Position.RIGHT:
        width += movementX;
        if (ratio) {
          height = width / ratio;
        }
        break;
      case Position.TOP_LEFT:
        left += movementX;
        top += movementY;
        if (ratio) {
          const newSize = getNewSizeWithMovements(
            movementX,
            movementY,
            width,
            height
          );
          if (newSize) {
            height = newSize.height;
            width = newSize.width;
          }
        } else {
          height -= movementY;
          width -= movementX;
        }
        break;
      case Position.TOP_RIGHT:
        top += movementY;
        if (ratio) {
          height -= movementY;
          width -= ratio * movementY;
        } else {
          height -= movementY;
          width += movementX;
        }
        break;
      case Position.BOTTOM_LEFT:
        left += movementX;
        if (ratio) {
          width -= movementX;
          height = width / ratio;
        } else {
          height += movementY;
          width -= movementX;
        }
        break;
      case Position.BOTTOM_RIGHT:
        if (ratio) {
          const newSize = getNewSizeWithMovements(
            movementX,
            movementY,
            width,
            height,
            true
          );
          if (newSize) {
            height = newSize.height;
            width = newSize.width;
          }
        } else {
          height += movementY;
          width += movementX;
        }
        break;
    }
    startCoordinator.x = left;
    startCoordinator.y = top;
    endCoordinator.x = left + width;
    endCoordinator.y = top + height;
    width = Math.max(width, minWidth);
    height = Math.max(height, minHeight);
    if (cropboxRef.current != null) {
      top = getBoundedTop(top);
      left = getBoundedLeft(left);
      cropboxRef.current.style.top = `${top}px`;
      cropboxRef.current.style.left = `${left}px`;
      if (!isNewWidthAndHeightOutOfBox(top, left, width, height)) {
        cropboxRef.current.style.width = `${width}px`;
        cropboxRef.current.style.height = `${height}px`;
      }
    }
  };

  const relocation = () => {
    let left = endCoordinator.x - startCoordinator.x;
    let top = endCoordinator.y - startCoordinator.y;
    if (cropboxRef.current != null) {
      left = getBoundedLeft(left);
      top = getBoundedTop(top);
      cropboxRef.current.style.top = `${top}px`;
      cropboxRef.current.style.left = `${left}px`;
    }
  };
  const getDistance = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => {
    const powX = Math.pow(p1.x - p2.x, 2);
    const powY = Math.pow(p1.y - p2.y, 2);
    return Math.sqrt(powX + powY);
  };
  const setTouchMove = (e: React.TouchEvent) => {
    if (cropContainerRef.current && e.touches.length == 2) {
      const pointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      const distance = getDistance(
        { x: e.touches[0].clientX, y: e.touches[0].clientY },
        { x: e.touches[1].clientX, y: e.touches[1].clientY }
      );
      const initdistance = getDistance(pointer, {
        x: cropContainerRef.current.getBoundingClientRect().x,
        y: cropContainerRef.current.getBoundingClientRect().y,
      });
      const scale = distance ? initdistance : 1;
      cropContainerRef.current.style.transformStyle = `translate(rotate(0deg) scale(${scale}))`;
    }
  };

  const handleContainerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isResizing) {
      e.stopPropagation();
      containerMouseMove(
        e.touches[0].clientX,
        e.touches[0].clientY,
        currentCropHandlerKey
      );
      setTouchMove(e);
    }
  };

  const stopMovingOrResizing = () => {
    isDragging = false;
    isResizing = false;
    currentCropHandlerKey = Position.NONE;
  };

  const handleContainerMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    stopMovingOrResizing();
  };

  const handleContainerMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    stopMovingOrResizing();
  };

  const handleContainerTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    stopMovingOrResizing();
  };

  const handleContainerMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    containerMouseMove(e.clientX, e.clientY, currentCropHandlerKey);
  };

  const cropBoxDragStart = (x: number, y: number) => {
    if (currentCropHandlerKey != Position.NONE) return;
    isDragging = true;
    const baseX = cropContainerRef
      ? cropContainerRef.current?.getBoundingClientRect().left || 0
      : 0;
    const baseY = cropContainerRef
      ? cropContainerRef.current?.getBoundingClientRect().top || 0
      : 0;
    const boxX = cropboxRef
      ? cropboxRef.current?.getBoundingClientRect().left || 0
      : 0;
    const boxY = cropboxRef
      ? cropboxRef.current?.getBoundingClientRect().top || 0
      : 0;
    startCoordinator.x = x - boxX;
    startCoordinator.y = y - boxY;
    oldLocation.x = x - baseX;
    oldLocation.y = y - baseY;
  };

  const handleCropBoxTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    cropBoxDragStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleCropBoxMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    cropBoxDragStart(e.clientX, e.clientY);
  };

  const moveCropBox = (x: number, y: number) => {
    if (isDragging && currentCropHandlerKey == Position.NONE) move(x, y);
  };

  const handleCropBoxTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    moveCropBox(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleCropBoxMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    moveCropBox(e.clientX, e.clientY);
  };

  const cropperResizeStart = (
    clientX: number,
    clientY: number,
    key: Position
  ) => {
    isResizing = true;
    oldPoint = {
      x: getRelativeX(clientX, cropContainerRef?.current),
      y: getRelativeY(clientY, cropContainerRef?.current),
    };
    oldPoint = { ...oldPoint };
    currentCropHandlerKey = key;
  };

  const handleAdjusterTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    key: Position
  ) => {
    cropperResizeStart(e.touches[0].clientX, e.touches[0].clientY, key);
    setTouchMove(e);
  };

  const handleAdjusterMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: Position
  ) => {
    cropperResizeStart(e.clientX, e.clientY, key);
  };

  return {
    handleContainerMouseLeave,
    handleContainerTouchEnd,
    handleContainerMouseUp,
    handleContainerMouseMove,
    handleContainerTouchMove,
    handleCropBoxTouchStart,
    handleCropBoxMouseDown,
    handleCropBoxTouchMove,
    handleCropBoxMouseMove,
    handleAdjusterTouchStart,
    handleAdjusterMouseDown,
  };
};
