import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import styles from './RadarChart.module.css'
import { useEffect, useRef } from 'react';
import { Radar } from 'react-chartjs-2';
const css = getComputedStyle(document.documentElement);
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
export default function RadarChart() {
    const chartRef = useRef(null);
    const time = useRef(0);

    useEffect(() => {
        let frame;

        const animate = () => {
            time.current += 0.15;

            if (chartRef.current) {
                chartRef.current.update('none');
            }

            frame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(frame);
    }, []);

    const data = {
        labels: [
            ['Illustration'],
            ['Simple', 'Animation'],
            ['Comic'],
            ['Web', 'Design'],
            ['Character', 'Design'],
        ],
        datasets: [{
            data: [5, 3, 3, 4, 5],
            fill: true,
            borderWidth: 3,

            backgroundColor: (context) => {
                const { ctx, chartArea } = context.chart;

                if (!chartArea) return;

                const t = time.current;

                const gradient = ctx.createLinearGradient(
                    chartArea.left,
                    chartArea.top,
                    chartArea.right,
                    chartArea.bottom
                );

                const stop1 = (Math.sin(t) + 1) / 2;
                const stop2 = (Math.sin(t + 1.5) + 1) / 2;

                gradient.addColorStop(
                    0,
                    `rgba(${26 * stop1}, 227, 16, 0.8)`
                );

                gradient.addColorStop(
                    0.5,
                    `rgba(28, ${132 + 100 * stop2}, 255, 0.8)`
                );

                gradient.addColorStop(
                    1,
                    `rgb(255, 244, 41)`
                );

                return gradient;
            },
            borderColor: css.getPropertyValue('--accent-color'),
            pointBackgroundColor: css.getPropertyValue('--accent-color'),
            pointBorderColor: css.getPropertyValue('--accent-color'),
            pointHoverBackgroundColor: css.getPropertyValue('--white'),
            pointHoverBorderColor: css.getPropertyValue('--white')
        }],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        animation: false,
        scales: {
            r: {

                min: 0,
                max: 5,
                angleLines: {
                    color: "#000000",
                },
                grid: {
                    color: "#000000",
                    lineWidth: 1

                },
                pointLabels: {
                    color: "#000000",
                    font: {
                        size: css.getPropertyValue('--font-size'),
                        family:  "Silkscreen"
                    },
                },
                ticks: {
                    stepSize: 1,
                    display: false
                },
            },
        },
        plugins: {
            legend: {
                display: false

            },
        },
    };
    return (
        <div className={styles.chart} >
            <Radar ref={chartRef} data={data} options={options} />
        </div >
    );

}