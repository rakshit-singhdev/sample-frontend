import { useEffect, useRef, useState } from 'react';

export default function App() {
    const sceneRef = useRef(null);
    const [status, setStatus] = useState('Initializing scene...');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Guard: sceneRef not yet attached
        if (!sceneRef.current) return;

        let cancelled = false;

        async function setupLayer() {
            try {
                const sceneEl = sceneRef.current;

                setStatus('Waiting for scene view...');

                // viewOnReady() resolves when the SceneView is fully ready
                await sceneEl.viewOnReady();

                // If StrictMode unmounted before view was ready, bail out
                if (cancelled) return;

                setStatus('Loading FeatureLayer...');

                const { default: FeatureLayer } = await import(
                    '@arcgis/core/layers/FeatureLayer.js'
                );

                if (cancelled) return;

                const arrowSourcePNG =
                    'https://jsapi.maps.arcgis.com/sharing/rest/content/items/0e6d7969d8b248f6aadb58affc75020e/data';

                const arrowTrendSymbol = {
                    type: 'point-3d',
                    symbolLayers: [
                        {
                            type: 'icon',
                            size: '30',
                            resource: { href: arrowSourcePNG },
                            material: { color: 'white' },
                            angle: 90,
                        },
                    ],
                };

                const layer = new FeatureLayer({
                    portalItem: {
                        id: 'e1018631be3c4069b57c2aff151aa013',
                    },
                    renderer: {
                        type: 'simple',
                        symbol: arrowTrendSymbol,
                    },
                });

                sceneEl.map.add(layer);
                setStatus('Layer loaded');
            } catch (err) {
                if (!cancelled) {
                    console.error('ArcGIS setup error:', err);
                    setError(err.message);
                    setStatus('Error');
                }
            }
        }

        setupLayer();

        // Cleanup for StrictMode double-invoke
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            {/* Status overlay - remove once working */}
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 999,
                    background: error ? '#c0392b' : '#2c3e50',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontFamily: 'monospace',
                    pointerEvents: 'none',
                }}
            >
                {error ? `Error: ${error}` : status}
            </div>

            <arcgis-scene
                ref={sceneRef}
                item-id="8244d9e565db4e448b19fb7d82e52315"
                style={{ height: '100%', width: '100%' }}
            >
                <arcgis-zoom slot="top-left" />
                <arcgis-navigation-toggle slot="top-left" />
                <arcgis-compass slot="top-left" />
                <arcgis-expand slot="bottom-left">
                    <arcgis-legend />
                </arcgis-expand>
            </arcgis-scene>
        </div>
    );
}