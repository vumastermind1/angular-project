import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  fadeIn(element: HTMLElement, time?: 'fast' | 'slow' | number, callback?: () => void) {
    let duration: number;

    if (typeof time === 'string') {
      duration = time === 'fast' ? 200 : 600;
    } else if (typeof time === 'number') {
      duration = time;
    } else {
      duration = 400;
    }

    if (element.style.display === 'none') {
      element.style.display = '';
    }
    element.style.opacity = '0';

    let last = +new Date().getTime();
    const tick = () => {
      element.style.opacity = `${+element.style.opacity + (new Date().getTime() - last) / duration}`;
      last = +new Date().getTime();

      if (+element.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      } else {
        element.style.opacity = '';
        callback && callback();
      }
    };

    tick();
  }

  fadeOut(element: HTMLElement, time?: 'fast' | 'slow' | number, callback?: () => void) {
    let duration: number;

    if (typeof time === 'string') {
      duration = time === 'fast' ? 200 : 600;
    } else if (typeof time === 'number') {
      duration = time;
    } else {
      duration = 400;
    }

    element.style.opacity = '1';

    let last = +new Date().getTime();
    const tick = () => {
      element.style.opacity = `${+element.style.opacity - (new Date().getTime() - last) / duration}`;
      last = +new Date().getTime();

      if (+element.style.opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      } else {
        element.style.opacity = '';
        element.style.display = 'none';
        callback && callback();
      }
    };

    tick();
  }
}
