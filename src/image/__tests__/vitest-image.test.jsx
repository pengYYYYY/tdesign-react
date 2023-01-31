/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs Image React(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import React from 'react';
import { fireEvent, vi, render, mockDelay, simulateImageEvent, mockIntersectionObserver } from '@test/utils';
import { Image } from '..';
import { getOverlayImageMount } from './mount';
import Space from '../../space';

describe('Image Component', () => {
  
  beforeAll(() => {
    // 用于判断是否已经触发回调
    window.observeCallbackhasCalled = false;
    const observe = (element, callback) => {
      // 监控图片容器的滚动事件，后面会触发容器的滚动。
      element.parentNode.parentNode.addEventListener('scroll', () => {
        if (window.observeCallbackhasCalled) {
          callback([{ isIntersecting: false }]);
        } else {
          window.observeCallbackhasCalled= true;
          callback([{ isIntersecting: true }]);
        }
      });
    }
    mockIntersectionObserver({}, { observe });
  });

  it('props.alt works fine', () => {
    const wrapper = render(<Image alt="text image load failed" src="https://www.error.img.com"></Image>);
    const container = wrapper.container.querySelector('img');
    expect(container.getAttribute('alt')).toBe('text image load failed');
  });

  it('props.error works fine', () => {
    const { container } = render(
      <Image error={<span className="custom-node">TNode</span>} src="https://this.is.an.error.img.com"></Image>,
    );
    const imgDom = container.querySelector('img');
    simulateImageEvent(imgDom, 'error');
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach((item) => {
    it(`props.fit is equal to ${item}`, () => {
      const wrapper = render(<Image fit={item}></Image>);
      const container = wrapper.container.querySelector('.t-image');
      expect(container).toHaveClass(`t-image--fit-${item}`);
      expect(container).toMatchSnapshot();
    });
  });

  it('props.gallery works fine', () => {
    // gallery default value is false
    const { container: container1 } = render(<Image></Image>);
    expect(container1.querySelector(`.${'t-image__wrapper--gallery'}`)).toBeFalsy();
    // gallery = true
    const { container: container2 } = render(<Image gallery={true}></Image>);
    expect(container2.firstChild).toHaveClass('t-image__wrapper--gallery');
    // gallery = false
    const { container: container3 } = render(<Image gallery={false}></Image>);
    expect(container3.querySelector(`.${'t-image__wrapper--gallery'}`)).toBeFalsy();
  });

  it('props.gallery works fine. `".t-image__gallery-shadow"` should exist', () => {
    const { container } = render(<Image gallery={true}></Image>);
    expect(container.querySelector('.t-image__gallery-shadow')).toBeTruthy();
  });

  it('props.loading works fine', () => {
    const { container } = render(<Image loading={<span className="custom-node">TNode</span>}></Image>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('props.overlayContent works fine', () => {
    const { container } = render(<Image overlayContent={<span className="custom-node">TNode</span>}></Image>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container.querySelector('.t-image__overlay-content')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('props.overlayTrigger: show overlay content on hover', async () => {
    const { container } = getOverlayImageMount(Image, {
      overlayTrigger: 'hover',
      src: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    });
    fireEvent.mouseEnter(container.querySelector('.t-image__wrapper'));
    await mockDelay();
    expect(container.querySelector('.t-image__overlay-content')).toBeTruthy();
    expect(container.querySelectorAll('.t-image__overlay-content--hidden').length).toBe(0);
    fireEvent.mouseLeave(container.querySelector('.t-image__wrapper'));
    await mockDelay();
    expect(container.querySelector('.t-image__overlay-content--hidden')).toBeTruthy();
  });

  it('props.placeholder works fine', () => {
    const { container } = render(<Image placeholder={<span className="custom-node">TNode</span>}></Image>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  const positionClassNameMap = {
    top: 't-image--position-top',
    bottom: 't-image--position-bottom',
    left: 't-image--position-left',
    right: 't-image--position-right',
    center: 't-image--position-center',
  };
  Object.entries(positionClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.position is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = render(<Image position={propValue}></Image>);
      const container = wrapper.container.querySelector('.t-image');
      expect(container).toHaveClass(expectedClassName);
    });
  });

  ['circle', 'round', 'square'].forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = render(<Image shape={item}></Image>);
      const container = wrapper.container.querySelector('.t-image__wrapper');
      expect(container).toHaveClass(`t-image__wrapper--shape-${item}`);
    });
  });

  it('events.error works fine', () => {
    const onErrorFn = vi.fn();
    const { container } = render(<Image src="https://load-failed-img.png" onError={onErrorFn}></Image>);
    const imgDom = container.querySelector('img');
    simulateImageEvent(imgDom, 'error');
    expect(container.querySelector('.t-image__error')).toBeTruthy();
    expect(container.querySelector('.t-icon-image-error')).toBeTruthy();
    expect(onErrorFn).toHaveBeenCalled(1);
    expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
  });

  it('events.load works fine', () => {
    const onLoadFn1 = vi.fn();
    const { container } = render(
      <Image src="https://tdesign.gtimg.com/demo/demo-image-1.png" onLoad={onLoadFn1}></Image>,
    );

    const imgDom = container.querySelector('img');
    simulateImageEvent(imgDom, 'load');
    expect(onLoadFn1).toHaveBeenCalled(1);
    expect(onLoadFn1.mock.calls[0][0].e.type).toBe('load');
  });

  it('props.lazy works fine', () => {
    document.body.height = 250;

    const { container } = render(
      <Space style={{height: 240, width: 240, overflow: 'hidden', overflowY: 'scroll', paddingTop: 500}}>
        {
          Array.from({length: 16}).map((_, index) => (
            <Image
              key={index}
              src="https://tdesign.gtimg.com/demo/demo-image-1.png"
              style={{width: 230, height: 120}}
              lazy
            />
          ))
        }
      </Space>
    );
    
    const spaceElement = container.querySelector('.t-space');
    fireEvent.scroll(spaceElement, { target: { scrollY: 400 } });
    // 滚动后，第一张图片会加载，但后面的图片不会加载
    expect(spaceElement.firstChild.querySelector('img')).not.toBeNull()
    expect(spaceElement.lastChild.querySelector('img')).toBeNull()
    
  });

});
