import React, { useEffect, useRef } from 'react';
import './index.less';
import classnames from 'classnames';

// 用于记录加载项数的变化
let dataLength = 0;

export default function InfiniteScroll(props: any) {
  // 监视器
  let observer: any = null;
  // 获取滚动容器的引用
  const innerScrollRef: any = useRef();
  // 获取加载中的引用
  const loadingRef = useRef();
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
  const loader = props?.loader || <p className="loading">加载中...</p>;
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
          ''
        )}
      </div>
    </div>
  );
}
