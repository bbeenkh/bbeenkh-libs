'use client';

/**
 * @file Snackbar/index.tsx
 * @author liam / liam@imnotpizzalib.com
 * @description Snackbar 컴포넌트
 */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  CircleCheckSolid,
  CircleExclamationSolid,
  CircleInfoSolid,
  TriangleExclamationSolid,
  XmarkSolid,
} from '../Icons';

export interface ISnackbarProps {
  title?: string;
  desc?: string;
  icon?: 'none' | 'success' | 'error' | 'warning' | 'info';
  type: 'text' | 'action';
  onClose?: () => void;
}

/**
 * Snackbar props type
 * @param title Snackbar 제목
 * @param desc Snackbar 설명
 * @param icon action 타입 시 좌측에 배치될 아이콘,
 * @param type Snackbar 타입 (text: 텍스트, action: 액션)
 */
export default function Snackbar({
  title,
  desc,
  icon,
  type,
  onClose,
}: ISnackbarProps) {
  const displayIcon = useMemo(() => {
    switch (icon) {
      case 'success':
        return (
          <CircleCheckSolid className="ods-fill-state-success ods-w-xl ods-h-xl" />
        );
      case 'error':
        return (
          <CircleExclamationSolid className="ods-fill-state-danger ods-w-xl ods-h-xl" />
        );
      case 'warning':
        return (
          <TriangleExclamationSolid className="ods-fill-state-warning ods-w-xl ods-h-xl" />
        );
      case 'info':
        return (
          <CircleInfoSolid className="ods-fill-state-info ods-w-xl ods-h-xl" />
        );
      default:
        return <></>;
    }
  }, [icon]);

  return (
    <div className="ods-bg-tertiary ods-w-80 ods-px-4 ods-py-3 ods-rounded-lg ods-justify-between ods-items-center ods-gap-8 ods-inline-flex ods-px-spacing-md ods-py-spacing-sm">
      <div className="ods-justify-start ods-items-center ods-gap-2 ods-flex">
        {icon !== 'none' && type === 'action' && (
          <div className="ods-min-w-6 ods-h-full">
            {displayIcon || { displayIcon }}
          </div>
        )}
        <div className="ods-flex ods-flex-col ods-justify-center ods-items-start ods-gap-1">
          {type === 'action' && (
            <div className="ods-text-white ods-text-xs ods-font-bold">
              {title}
            </div>
          )}
          {desc && (
            <span
              className={classNames(
                'ods-text-white ods-inline-block ods-text-xs ods-font-normal ods-whitespace-normal ods-break-words ods-line',
              )}
            >
              {desc}
            </span>
          )}
        </div>
      </div>
      {type === 'action' && (
        <button
          className="ods-ml-spacing-md"
          onClick={() => {
            onClose && onClose();
            toast.dismiss();
          }}
        >
          <XmarkSolid
            className="ods-w-md ods-h-md ods-cursor-pointer"
            fill="white"
          />
        </button>
      )}
    </div>
  );
}
