import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Masonry.css';

type MasonryItem = {
  src: string;
  alt: string;
  title: string;
};

type MasonryProps = {
  items: MasonryItem[];
  columnWidth?: number;
  gap?: number;
  columns?: number;
  animationDuration?: number;
  stagger?: number;
};

type MasonryItemData = {
  el: HTMLDivElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

const Masonry = ({
  items,
  columnWidth = 280,
  gap = 16,
  columns: forcedColumns,
  animationDuration = 0.6,
  stagger = 0.05
}: MasonryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<MasonryItemData[]>([]);
  const [columns, setColumns] = useState(forcedColumns || 3);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageHeights, setImageHeights] = useState<number[]>([]);

  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      if (!forcedColumns) {
        const cols = Math.max(1, Math.floor((width + gap) / (columnWidth + gap)));
        setColumns(cols);
      } else {
        setColumns(forcedColumns);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [columnWidth, gap, forcedColumns]);

  useEffect(() => {
    const loadedHeights: number[] = new Array(items.length).fill(columnWidth);
    let loadedCount = 0;
    const totalItems = items.length;

    if (totalItems === 0) {
      setImageHeights([]);
      return;
    }

    items.forEach((item, index) => {
      const img = new window.Image();
      img.onload = () => {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        loadedHeights[index] = columnWidth * aspectRatio;
        loadedCount++;
        if (loadedCount === totalItems) {
          setImageHeights([...loadedHeights]);
        }
      };
      img.onerror = () => {
        loadedHeights[index] = columnWidth;
        loadedCount++;
        if (loadedCount === totalItems) {
          setImageHeights([...loadedHeights]);
        }
      };
      img.src = item.src;
    });
  }, [items, columnWidth]);

  useEffect(() => {
    if (!containerRef.current || containerWidth === 0 || imageHeights.length === 0) return;

    const container = containerRef.current;
    container.innerHTML = '';
    const colHeights = new Array(columns).fill(0);
    const newItems: MasonryItemData[] = [];

    items.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'masonry-item';
      el.innerHTML = `
        <div class="masonry-item-inner">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" />
          <div class="masonry-item-content">
            <span class="masonry-item-title">${item.title}</span>
          </div>
        </div>
      `;
      container.appendChild(el);

      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      const x = shortestCol * (columnWidth + gap);
      const y = colHeights[shortestCol];
      const height = imageHeights[index] || columnWidth;

      newItems.push({ el, x, y, width: columnWidth, height });
      colHeights[shortestCol] += height + gap;
    });

    const totalHeight = Math.max(...colHeights);
    container.style.height = `${totalHeight}px`;

    gsap.set(newItems.map(item => item.el), {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(10px)'
    });

    requestAnimationFrame(() => {
      gsap.to(newItems.map(item => item.el), {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: animationDuration,
        stagger,
        ease: 'power2.out'
      });
    });

    return () => {
      newItems.forEach(item => item.el.remove());
    };
  }, [items, columns, columnWidth, gap, animationDuration, stagger, containerWidth, imageHeights]);

  return (
    <div
      ref={containerRef}
      className="masonry-container"
      style={{ position: 'relative', width: '100%' }}
    />
  );
};

export default Masonry;
