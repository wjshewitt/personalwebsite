const { projectCoveredSourceY } = await import("../src/lib/coverProjection.ts");

// horizonFromBottom must stay in sync with u_shoreline (0.467) in OceanCanvas.
const landscape = projectCoveredSourceY(1948, 650, 2048, 1536, 0.467);
const portrait = projectCoveredSourceY(390, 844, 2048, 1536, 0.467);

if (Math.abs(landscape - 373.2) >= 1) throw new Error(`landscape horizon: ${landscape}`);
if (Math.abs(portrait - 449.9) >= 1) throw new Error(`portrait horizon: ${portrait}`);
globalThis.console.log("horizon projection: ok");
