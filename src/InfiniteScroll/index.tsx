import React, { useEffect, useRef } from 'react';
import './index.less';
import classnames from 'classnames';

// 用于记录加载项数的变化
let dataLength = 0;
export type ReactElement = JSX.Element;

export interface IScrollProps {
  /**
   * 是否还有更多数据未加载
   * @description       是否还有更多数据未加载,flase 的时候会停止继续加载
   * @description.zh-CN 是否还有更多数据未加载,flase 的时候会停止继续加载
   * @default           true
   */
  hasMore: boolean;
  /**
   * 加载到最后一页的数据样式
   * @description       加载到最后一页的数据样式
   * @description.zh-CN 加载到最后一页的数据样式
   * @default           已经到底了
   */
  endFont?: Function | string;
  /**
   * 数据的长度
   * @description       数据的长度监控，如果小于已经加载的数据被视为重新初始化化
   * @description.zh-CN 数据的长度监控，如果小于已经加载的数据被视为重新初始化化
   * @default
   */
  dataLength: number;
  /**
   * 加载中样式的回调 或者是 ReactElement
   * @description        加载中样式的回调 或者是 ReactElement
   * @description.zh-CN  加载中样式的回调 或者是 ReactElement
   * @default           <p className="loading">加载中...</p>
   */
  loader?: ReactElement | Function;
  /**
   *  加到底请求数据的回调
   * @description       到底请求数据的回调
   * @description.zh-CN  到底请求数据的回调
   * @default           ()=>{}
   */
  next?: Function;
  /**
   * 类名
   * @description       类名
   * @description.zh-CN 类名
   * @default
   */
  className?: Function;
  children?: any;
}

export default function InfiniteScroll(props: IScrollProps) {
  // 监视器
  let observer: any = null;
  // 获取滚动容器的引用
  const innerScrollRef: any = useRef();
  // 获取加载中的引用
  const loadingRef: any = useRef();
  // 是否还有更多
  const hasMore = props?.hasMore || false;
  // 使用es6的监听器
  const createIntersectionObserver = () => {
    observer = new IntersectionObserver(entries => {
      console.log('entry: ', entries);
      if (entries[0].intersectionRatio <= 0) return;
      fetchCb();
    });
    // 监视加载中的容器 进行分页
    observer.observe(loadingRef.current);
    return observer;
  };

  // 加载到最后的文案
  const loadingEndFont = props?.endFont
    ? typeof props.endFont == 'function'
      ? props.endFont()
      : props.endFont
    : '已经到底了';

  useEffect(() => {
    if (dataLength > props.dataLength) {
      // 这里说明是 重新加载了 重新初始化监听器
      createIntersectionObserver();
    }
    dataLength = props.dataLength;
  }, [props.dataLength]);

  useEffect(() => {
    createIntersectionObserver();
    return () => {
      // 关闭观察器
      observer.disconnect();
    };
  }, []);

  // 进行ajax回调 进行分页
  function fetchCb() {
    console.log('这里是进行回调');
    innerScrollRef.current.scrollTop = 0;
    props?.next && props?.next();
  }

  // 加载样式
  const loader = props?.loader ? (
    typeof props.loader === 'function' ? (
      props.loader()
    ) : (
      props.loader
    )
  ) : (
    <p className="loading">加载中...</p>
  );
  return (
    <div className={classnames(['infinite-scroll', props.className])}>
      <div className="inner-scroll" ref={innerScrollRef}>
        {props.children}
        {hasMore ? (
          <div
            className="loading-container"
            id="loading-container"
            ref={loadingRef}
          >
            {loader}
          </div>
        ) : (
          loadingEndFont
        )}
      </div>
    </div>
  );
}
