import { useEffect, useState } from 'react';

/**
 * Pyodide预缓存Hook
 * 使用requestIdleCallback在页面空闲时预加载Pyodide和Pandas依赖
 */
export const usePyodidePreload = () => {
  const [status, setStatus] = useState('idle'); // idle | preloading | ready | error
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 如果已经加载过，直接跳过
    if (window.loadPyodide && window.__pyodideCacheReady) {
      setStatus('ready');
      setProgress(100);
      return;
    }

    const preloadPyodide = () => {
      setStatus('preloading');
      setProgress(10);

      // 预加载Pyodide脚本
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
      script.async = true;
      
      script.onload = async () => {
        setProgress(30);
        
        try {
          // 初始化Pyodide
          const pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/'
          });
          
          setProgress(50);
          
          // 预加载pandas和numpy
          await pyodide.loadPackage(['pandas', 'numpy']);
          
          setProgress(90);
          
          // 标记缓存已准备好
          window.__pyodideCacheReady = true;
          window.__pyodideInstance = pyodide;
          
          setProgress(100);
          setStatus('ready');
          
          console.log('✅ Pyodide预缓存完成');
        } catch (err) {
          console.warn('Pyodide预加载失败:', err);
          setStatus('error');
        }
      };
      
      script.onerror = () => {
        console.warn('Pyodide脚本加载失败');
        setStatus('error');
      };
      
      document.head.appendChild(script);
    };

    // 使用requestIdleCallback在空闲时执行
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => {
        // 延迟2秒后开始预加载，确保首屏优先渲染
        setTimeout(preloadPyodide, 2000);
      }, { timeout: 10000 });
      
      return () => window.cancelIdleCallback(idleId);
    } else {
      // 降级处理：直接使用setTimeout
      setTimeout(preloadPyodide, 2000);
    }
  }, []);

  return { status, progress };
};

/**
 * 图片懒加载Hook
 */
export const useLazyLoad = (threshold = 0.1) => {
  useEffect(() => {
    // 使用IntersectionObserver实现图片懒加载
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
              }
            }
          });
        },
        { threshold }
      );

      // 观察所有带data-src的图片
      document.querySelectorAll('img[data-src]').forEach((img) => {
        observer.observe(img);
      });

      return () => observer.disconnect();
    }
  }, [threshold]);
};

/**
 * 组件可见性Hook
 */
export const useVisibilityChange = (onHidden, onVisible) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onHidden?.();
      } else {
        onVisible?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [onHidden, onVisible]);
};
