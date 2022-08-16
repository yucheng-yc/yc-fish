import React from 'react';
import { InfiniteScroll } from 'yc-fish';
export default () => {
  const list = Array(12).fill(' ');
  const hasMore = true;
  const fetchMoreData = () => {
    console.log('fetchMoreData');
  };
  return (
    <InfiniteScroll
      className="scroll-container"
      dataLength={list.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p className="loading">加载中...</p>}
    >
      {list.map((it, idx) => {
        return <span key={idx}>这是列表</span>;
      })}
    </InfiniteScroll>
  );
};
