import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";
import { projectCoveredSourceY } from "../lib/coverProjection";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
};

function Button({ variant: _variant, size: _size, ...props }: ButtonProps) {
  void _variant;
  void _size;
  return <button {...props} />;
}

const scenes = [
  {
    src: "/assets/sunset-sea.jpg",
    label: "Newsreader typography",
    description: "Photographed sea · Newsreader 300 name · full Earendil grain",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "photo",
    filmEffect: "earendil",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Experience index",
    description: "Duplicate photographed treatment · no added grain",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "photo",
    filmEffect: "none",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Editorial serif",
    description: "Photographed sea · Newsreader name · fixed digital grain",
    presentation: "sky",
    nameStyle: "serif",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "photo",
    filmEffect: "current",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Procedural ocean",
    description: "Ray-marched sea · fixed digital grain",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "procedural",
    filmEffect: "current",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Earendil film",
    description: "Ray-marched sea · animated Earendil grain",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "procedural",
    filmEffect: "earendil",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Modelled grain",
    description: "Ray-marched sea · static texture grain",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "procedural",
    filmEffect: "static",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Gerstner ocean",
    description: "Directional Gerstner waves · analytic normals · no added grain",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "gerstner",
    filmEffect: "none",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Spectral ocean",
    description: "Three-band wind spectrum · deep-water dispersion · filtered reflections",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "spectral",
    filmEffect: "none",
  },
  {
    src: "/assets/sunset-sea.jpg",
    label: "Photo hybrid",
    description: "Original sea texture · spectral warp · dynamic ridge light",
    presentation: "sky",
    nameStyle: "display",
    water: [0.0, 0.53],
    horizon: 0.5,
    porthole: 0,
    strength: 0.82,
    colourLeak: 0.085,
    oceanMode: "hybrid",
    filmEffect: "none",
  },
] as const;

const fullIdentityName = "William Hewitt";
const finalIdentityName = "Will Hewitt";
const photoFrame = {
  width: 2048,
  height: 1536,
  // Must match u_shoreline below: the waterline at source row ~819/1536.
  horizonFromBottom: 0.467,
} as const;

type Presentation = (typeof scenes)[number]["presentation"];

function SlateClose({ onClose, dark = false }: { onClose: () => void; dark?: boolean }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={dark ? "slate-close slate-close--dark" : "slate-close"}
      aria-label="Close about card"
      onClick={onClose}
    >
      <span className="slate-close-word">Back</span>
      <span className="slate-close-arrow" aria-hidden="true">↓</span>
    </Button>
  );
}

function SocialLinks({ className = "slate-links" }: { className?: string }) {
  return (
    <nav className={className} aria-label="Social links">
      <a href="mailto:hewittjswill@gmail.com">Email</a>
      <a href="https://www.linkedin.com/in/william-js-hewitt/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a href="https://x.com/willjshewitt" target="_blank" rel="noreferrer">X</a>
    </nav>
  );
}

function IntroStatement({ className }: { className: string }) {
  return (
    <p className={className}>
      <span>I work on software, editorial products, analytics tools, and writing.</span>
      <span>Currently at Stripe working on Works in Progress magazine and Stripe Press.</span>
    </p>
  );
}

function SkyIntroStatement() {
  return (
    <p className="sky-intro">
      <span>
        I work on ops at{" "}
        <Button
          type="button"
          className="wip-definition-trigger"
          aria-describedby="wip-definition"
        >
          Works in Progress
        </Button>{" "}
        and live in London.
      </span>
      <span className="sky-role-line sky-supporting-copy">
        <span className="sky-personal-copy">
          I’m interested in housing, planning, startups, private markets, and
          anything else derivative of or related to those things. When I can, I
          like to tinker with boats, sail them, climb things, watch motorsport,
          code projects and cross-country run.
        </span>
        <span
          id="wip-definition"
          className="wip-definition"
          role="tooltip"
        >
          A magazine of new and underrated ideas to improve the world. We mainly
          publish articles on scientific, economic, and technological progress.{" "}
          <a
            href="https://substack.com/home/post/p-196799760"
            target="_blank"
            rel="noreferrer"
          >
            Pitch us!
          </a>
        </span>
      </span>
    </p>
  );
}

function AboutContent({ presentation, onClose }: { presentation: Presentation; onClose: () => void }) {
  if (presentation === "sky") {
    return (
      <>
        <div className="sky-copy">
          <SkyIntroStatement />
          <SocialLinks className="sky-links" />
        </div>
        <SlateClose onClose={onClose} />
      </>
    );
  }

  if (presentation === "plain") {
    return (
      <>
        <div className="plain-topline">
          <span>Will Hewitt</span>
          <SlateClose onClose={onClose} dark />
        </div>
        <div className="plain-body">
          <IntroStatement className="plain-intro" />
          <dl className="plain-facts">
            <div><dt>Based</dt><dd>London</dd></div>
            <div><dt>Interested in</dt><dd>Sailing · Publishing · Technology</dd></div>
          </dl>
        </div>
        <SocialLinks className="plain-links" />
      </>
    );
  }

  if (presentation === "resume") {
    return (
      <>
        <div className="resume-topline">
          <span>Will Hewitt</span>
          <SlateClose onClose={onClose} />
        </div>
        <IntroStatement className="resume-intro" />
        <div className="resume-layout">
          <section>
            <h2>Experience</h2>
            <ul className="resume-list">
              <li><span>Works in Progress</span><span>Operations</span></li>
              <li><span>Tract UK</span><span>Founder’s Associate</span></li>
              <li><span>Dean Street Advisers</span><span>Intern</span></li>
              <li><span>Kindred for Business</span><span>Intern</span></li>
              <li><span>Ruffer LLP</span><span>Work experience</span></li>
              <li><span>Media Intelligence Partners</span><span>Intern</span></li>
            </ul>
          </section>
          <aside className="resume-side">
            <div>
              <h3>Focus</h3>
              <p>Software<br />Editorial products<br />Analytics tools<br />Writing</p>
            </div>
            <SocialLinks className="resume-links" />
          </aside>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="slate-topline">
        <span>About</span>
        <SlateClose onClose={onClose} />
      </div>

      <div className="slate-heading">
        <IntroStatement className="slate-intro" />
      </div>

      <dl className="slate-details">
        <div><dt>Based</dt><dd>London</dd></div>
        <div><dt>Interested in</dt><dd>Sailing · Publishing · Technology</dd></div>
      </dl>

      <SocialLinks />
    </>
  );
}

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform vec2 u_waterBand;
  uniform float u_horizon;
  uniform float u_porthole;
  uniform float u_strength;
  uniform float u_colourLeak;
  uniform vec2 u_pointer;
  uniform float u_nameHover;
  uniform float u_cameraLift;
  uniform float u_time;
  uniform float u_motion;
  uniform float u_mobile;
  uniform float u_proceduralOcean;
  uniform float u_gerstnerOcean;
  uniform float u_spectralOcean;
  uniform float u_hybridOcean;
  uniform float u_filmGrain;
  uniform float u_earendilFilm;
  uniform float u_grainScale;
  uniform float u_photoSeaTone;
  uniform float u_shoreline;
  uniform vec3 u_skyMean;
  varying vec2 v_uv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise21(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
      f.y
    );
  }

  vec2 coverUv(vec2 uv) {
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageResolution.x / u_imageResolution.y;
    vec2 scale = vec2(1.0);
    if (screenAspect > imageAspect) {
      scale.y = imageAspect / screenAspect;
    } else {
      scale.x = screenAspect / imageAspect;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  vec3 wideSkySample(float x, float y) {
    vec3 sampleColour = vec3(0.0);
    sampleColour += texture2D(u_image, vec2(clamp(x - 0.20, 0.02, 0.98), y)).rgb * 0.25;
    sampleColour += texture2D(u_image, vec2(clamp(x, 0.02, 0.98), y)).rgb * 0.50;
    sampleColour += texture2D(u_image, vec2(clamp(x + 0.20, 0.02, 0.98), y)).rgb * 0.25;
    return sampleColour;
  }

  // Variant 06 combines the existing photographic treatment with the wave
  // construction from afl_ext's MIT-licensed "Very fast procedural ocean".
  // The height field is rebuilt here for this photograph and never samples
  // the original sea; only the preserved sky is used for reflections.
  vec2 oceanWave(vec2 position, vec2 direction, float frequency, float phase) {
    float x = dot(direction, position) * frequency + phase;
    float wave = exp(sin(x) - 1.0);
    return vec2(wave, -wave * cos(x));
  }

  float oceanHeightMarch(vec2 position) {
    float radialPhase = length(position) * 0.075;
    float directionSeed = 0.0;
    float frequency = 0.82;
    float speed = 0.36;
    float weight = 1.0;
    float value = 0.0;
    float weights = 0.0;
    for (int i = 0; i < 5; i++) {
      vec2 direction = vec2(sin(directionSeed), cos(directionSeed));
      vec2 wave = oceanWave(
        position,
        direction,
        frequency,
        u_time * speed * u_motion + radialPhase
      );
      position += direction * wave.y * weight * 0.14;
      value += wave.x * weight;
      weights += weight;
      weight *= 0.78;
      frequency *= 1.32;
      speed *= 1.07;
      directionSeed += 2.399963;
    }
    return value / weights;
  }

  float oceanHeightDetail(vec2 position, float footprint) {
    float radialPhase = length(position) * 0.075;
    float directionSeed = 0.0;
    float frequency = 0.96;
    float speed = 0.36;
    float weight = 1.0;
    float value = 0.0;
    float weights = 0.0;
    for (int i = 0; i < 8; i++) {
      vec2 direction = vec2(sin(directionSeed), cos(directionSeed));
      vec2 wave = oceanWave(
        position,
        direction,
        frequency,
        u_time * speed * u_motion + radialPhase
      );
      // An octave whose wavelength falls below the pixel footprint cannot be
      // resolved; sampling it anyway reads as sparkle. Fading each octave as
      // it approaches that limit band-limits the field to what a pixel can
      // actually show. Only the contribution fades, never the denominator,
      // so surviving octaves keep their true amplitude.
      float resolvable = 1.0 - smoothstep(1.0, 3.0, frequency * footprint);
      position += direction * wave.y * weight * resolvable * 0.14;
      value += wave.x * weight * resolvable;
      weights += weight;
      weight *= 0.78;
      frequency *= 1.42;
      speed *= 1.07;
      directionSeed += 2.399963;
    }
    return value / weights;
  }

  float oceanSurfaceMarch(vec2 position) {
    return oceanHeightMarch(position) * 0.28 - 0.28;
  }

  float oceanSurfaceDetail(vec2 position, float footprint) {
    return oceanHeightDetail(position, footprint) * 0.28 - 0.28;
  }

  float oceanPlaneHit(vec3 origin, vec3 direction, float height) {
    return (height - origin.y) / min(direction.y, -0.0001);
  }

  // The traced surface flattens toward its mean height with distance. Past
  // twenty units the secant bracket spans more than half a wavelength, and a
  // search that assumes a single crossing jumps between crests as scrolling
  // tilts the rays. Beyond the flatten the wave shape is carried entirely by
  // the shading normals, which is where the eye reads it at that range.
  float tracedSurface(vec2 position, float distanceAlongRay) {
    float flatten = smoothstep(20.0, 60.0, distanceAlongRay);
    return mix(oceanSurfaceMarch(position), -0.15, flatten);
  }

  float traceOcean(vec3 origin, vec3 direction) {
    float nearDistance = oceanPlaneHit(origin, direction, 0.0);
    float farDistance = oceanPlaneHit(origin, direction, -0.28);
    float nearDelta = (origin + direction * nearDistance).y
      - tracedSurface((origin + direction * nearDistance).xz, nearDistance);
    float farDelta = (origin + direction * farDistance).y
      - tracedSurface((origin + direction * farDistance).xz, farDistance);

    // A bounded secant search needs far fewer samples than fixed-step
    // marching and remains stable where the view becomes almost horizontal.
    for (int i = 0; i < 8; i++) {
      float ratio = clamp(nearDelta / (nearDelta - farDelta), 0.12, 0.88);
      float distanceAlongRay = mix(nearDistance, farDistance, ratio);
      vec3 point = origin + direction * distanceAlongRay;
      float delta = point.y - tracedSurface(point.xz, distanceAlongRay);
      if (delta > 0.0) {
        nearDistance = distanceAlongRay;
        nearDelta = delta;
      } else {
        farDistance = distanceAlongRay;
        farDelta = delta;
      }
    }
    return mix(nearDistance, farDistance, 0.5);
  }

  vec3 oceanNormal(vec2 position, float distanceAlongRay) {
    // The grazing perspective stretches one pixel row across roughly
    // t^1.5 world units of sea, which is the footprint the octave fade
    // above compares against. The 1.7 constant sets how early fine octaves
    // retire; raise it if any sparkle survives, lower it if the middle
    // distance turns too glassy.
    float footprint = distanceAlongRay * sqrt(distanceAlongRay) * 5.0
      / max(u_resolution.y, 1.0);
    float epsilon = mix(0.026, 0.090, clamp(distanceAlongRay / 180.0, 0.0, 1.0));
    float centre = oceanSurfaceDetail(position, footprint);
    float east = oceanSurfaceDetail(position + vec2(epsilon, 0.0), footprint);
    float north = oceanSurfaceDetail(position + vec2(0.0, epsilon), footprint);
    vec3 normal = normalize(vec3(centre - east, epsilon, centre - north));
    // The reflection samples the photograph right at the mountain/sky
    // boundary, a hard edge that any leftover normal wobble aliases against
    // as horizontal streaks. The flatten must therefore complete, not stop
    // at ninety percent, and before the far streak band begins.
    float distanceSmoothing = smoothstep(24.0, 110.0, distanceAlongRay);
    return normalize(mix(normal, vec3(0.0, 1.0, 0.0), distanceSmoothing));
  }

  vec3 proceduralOceanColour(vec2 imageUv, float imageY) {
    float aspect = u_resolution.x / u_resolution.y;
    float distanceBelowShore = max(u_shoreline - imageY, 0.00045);
    vec3 origin = vec3(0.0, 1.42, u_time * u_motion * 0.045);
    vec3 ray = normalize(vec3(
      (v_uv.x - 0.5) * aspect * 1.06,
      -(0.010 + distanceBelowShore * 2.72),
      1.36
    ));
    float distanceAlongRay = traceOcean(origin, ray);
    vec3 hit = origin + ray * distanceAlongRay;
    vec3 normal = oceanNormal(hit.xz, distanceAlongRay);
    vec3 reflectedRay = reflect(ray, normal);

    float reflectionX = clamp(imageUv.x + reflectedRay.x * 0.11, 0.02, 0.98);
    float reflectionY = clamp(
      u_shoreline + 0.035 + max(reflectedRay.y, 0.0) * 0.30,
      u_shoreline + 0.018,
      0.965
    );
    vec3 reflectedSky = texture2D(u_image, vec2(reflectionX, reflectionY)).rgb;
    reflectedSky = mix(reflectedSky, u_skyMean, 0.12);
    vec3 horizonColour = texture2D(
      u_image,
      vec2(clamp(imageUv.x, 0.02, 0.98), u_shoreline + 0.012)
    ).rgb;

    float viewFacing = clamp(dot(normal, -ray), 0.0, 1.0);
    float fresnel = 0.04 + 0.96 * pow(1.0 - viewFacing, 5.0);
    vec3 deepWater = mix(vec3(0.022, 0.040, 0.054), u_skyMean * 0.30, 0.30);
    vec3 ocean = mix(deepWater, reflectedSky, 0.28 + fresnel * 0.34);

    vec3 sunDirection = normalize(vec3(-0.06, 0.42, 1.0));
    float sunAlignment = max(dot(reflectedRay, sunDirection), 0.0);
    // A lower exponent spreads the sunlight across more ridge normals. The
    // higher-frequency detail field breaks that reflection into fine bands.
    float sunGlint = pow(sunAlignment, 78.0) * 0.43;
    float crest = (1.0 - normal.y) * smoothstep(-0.28, -0.025, hit.y);
    ocean += reflectedSky * crest * 0.11;
    ocean += mix(reflectedSky, vec3(1.0, 0.78, 0.50), 0.52) * sunGlint;

    float horizonFog = smoothstep(62.0, 240.0, distanceAlongRay);
    ocean = mix(ocean, horizonColour, horizonFog * 0.84);
    return ocean;
  }

  void addGerstnerWave(
    vec2 position,
    vec2 direction,
    float frequency,
    float amplitude,
    float speed,
    float phaseOffset,
    float steepness,
    float detailFade,
    inout float height,
    inout vec3 tangentX,
    inout vec3 tangentZ
  ) {
    vec2 waveDirection = normalize(direction);
    float phase = dot(waveDirection, position) * frequency
      + u_time * speed * u_motion
      + phaseOffset;
    float sine = sin(phase);
    float cosine = cos(phase);
    float waveAmplitude = amplitude * detailFade;
    float horizontal = steepness * waveAmplitude;
    float slope = waveAmplitude * frequency;

    height += waveAmplitude * sine;
    tangentX += vec3(
      -horizontal * frequency * waveDirection.x * waveDirection.x * sine,
      slope * waveDirection.x * cosine,
      -horizontal * frequency * waveDirection.x * waveDirection.y * sine
    );
    tangentZ += vec3(
      -horizontal * frequency * waveDirection.x * waveDirection.y * sine,
      slope * waveDirection.y * cosine,
      -horizontal * frequency * waveDirection.y * waveDirection.y * sine
    );
  }

  vec4 gerstnerSurface(vec2 position, float distanceAlongRay) {
    float height = 0.0;
    vec3 tangentX = vec3(1.0, 0.0, 0.0);
    vec3 tangentZ = vec3(0.0, 0.0, 1.0);
    float middleFade = 1.0 - smoothstep(55.0, 155.0, distanceAlongRay);
    float detailFade = (1.0 - smoothstep(18.0, 72.0, distanceAlongRay))
      * mix(1.0, 0.55, u_mobile);

    // Directions stay within one swell family. Opposing wave sets produce
    // the conspicuous cross-hatching the earlier ocean treatment suffered.
    addGerstnerWave(position, vec2(0.20, 0.98), 0.18, 0.130, 0.43, 0.0, 0.52, 1.0,
      height, tangentX, tangentZ);
    addGerstnerWave(position, vec2(-0.13, 0.99), 0.29, 0.078, 0.54, 1.7, 0.46, 1.0,
      height, tangentX, tangentZ);
    addGerstnerWave(position, vec2(0.39, 0.92), 0.52, 0.043, 0.69, 3.2, 0.38, middleFade,
      height, tangentX, tangentZ);
    addGerstnerWave(position, vec2(-0.34, 0.94), 0.79, 0.026, 0.83, 4.6, 0.31, middleFade,
      height, tangentX, tangentZ);
    addGerstnerWave(position, vec2(0.57, 0.82), 1.18, 0.013, 1.02, 2.4, 0.22, detailFade,
      height, tangentX, tangentZ);
    addGerstnerWave(position, vec2(-0.47, 0.88), 1.68, 0.008, 1.17, 5.5, 0.16, detailFade,
      height, tangentX, tangentZ);

    vec3 normal = normalize(cross(tangentZ, tangentX));
    normal = normalize(mix(
      normal,
      vec3(0.0, 1.0, 0.0),
      smoothstep(95.0, 245.0, distanceAlongRay)
    ));
    return vec4(normal, height);
  }

  vec3 gerstnerOceanColour(vec2 imageUv, float imageY) {
    float aspect = u_resolution.x / u_resolution.y;
    float distanceBelowShore = max(u_shoreline - imageY, 0.00045);
    vec3 origin = vec3(0.0, 1.42, u_time * u_motion * 0.035);
    vec3 ray = normalize(vec3(
      (v_uv.x - 0.5) * aspect * 1.06,
      -(0.010 + distanceBelowShore * 2.72),
      1.36
    ));

    // A direct plane hit is continuous at grazing angles. One bounded height
    // correction gives the Gerstner surface depth without an iterative root
    // search that can switch crests near the horizon.
    float distanceAlongRay = oceanPlaneHit(origin, ray, -0.15);
    vec3 hit = origin + ray * distanceAlongRay;
    vec4 surface = gerstnerSurface(hit.xz, distanceAlongRay);
    float correctedHeight = -0.15 + surface.w
      * (1.0 - smoothstep(75.0, 210.0, distanceAlongRay));
    distanceAlongRay = oceanPlaneHit(origin, ray, correctedHeight);
    hit = origin + ray * distanceAlongRay;
    surface = gerstnerSurface(hit.xz, distanceAlongRay);

    vec3 normal = surface.xyz;
    vec3 reflectedRay = reflect(ray, normal);
    float reflectionX = clamp(imageUv.x + reflectedRay.x * 0.10, 0.02, 0.98);
    float reflectionY = clamp(
      u_shoreline + 0.038 + max(reflectedRay.y, 0.0) * 0.29,
      u_shoreline + 0.018,
      0.965
    );
    vec3 reflectedSky = texture2D(u_image, vec2(reflectionX, reflectionY)).rgb;
    reflectedSky = mix(reflectedSky, u_skyMean, 0.14);
    vec3 horizonColour = texture2D(
      u_image,
      vec2(clamp(imageUv.x, 0.02, 0.98), u_shoreline + 0.012)
    ).rgb;

    float viewFacing = clamp(dot(normal, -ray), 0.0, 1.0);
    float fresnel = 0.035 + 0.965 * pow(1.0 - viewFacing, 5.0);
    vec3 deepWater = mix(vec3(0.020, 0.039, 0.053), u_skyMean * 0.28, 0.28);
    vec3 ocean = mix(deepWater, reflectedSky, 0.26 + fresnel * 0.38);

    vec3 sunDirection = normalize(vec3(-0.06, 0.42, 1.0));
    float sunAlignment = max(dot(reflectedRay, sunDirection), 0.0);
    float sunGlint = pow(sunAlignment, 88.0) * 0.36;
    float crest = smoothstep(0.025, 0.18, surface.w) * (1.0 - normal.y);
    ocean += reflectedSky * crest * 0.16;
    ocean += mix(reflectedSky, vec3(1.0, 0.78, 0.50), 0.50) * sunGlint;

    float horizonFog = smoothstep(75.0, 245.0, distanceAlongRay);
    return mix(ocean, horizonColour, horizonFog * 0.86);
  }

  vec4 spectralSurface(vec2 position, float distanceAlongRay) {
    float height = 0.0;
    vec2 gradient = vec2(0.0);
    float footprint = distanceAlongRay * sqrt(max(distanceAlongRay, 0.0)) * 3.2
      / max(u_resolution.y, 1.0);

    // Production FFT oceans sum thousands of these spectrum samples through
    // an inverse transform. For this fixed WebGL view, eighteen deterministic
    // modes preserve the same three simulation bands while avoiding the
    // multipass float-texture pipeline and its browser compatibility cost.
    for (int i = 0; i < 18; i++) {
      float waveIndex = float(i);
      float localIndex = mod(waveIndex, 6.0);
      float band = floor(waveIndex / 6.0);
      float frequency;
      float amplitude;
      float spread;

      if (band < 0.5) {
        // Swell: a peaked, narrow directional spectrum over long wavelengths.
        frequency = 0.045 * pow(1.65, localIndex);
        float peakDistance = (localIndex - 2.15) * 0.48;
        amplitude = 0.165 * exp(-peakDistance * peakDistance)
          * pow(0.76, max(localIndex - 2.15, 0.0));
        spread = 0.30;
      } else if (band < 1.5) {
        // Agitation: shorter wind waves that carry most visible surface shape.
        frequency = 0.54 * pow(1.57, localIndex);
        amplitude = 0.029 * pow(0.62, localIndex);
        spread = 0.62;
      } else {
        // Ripples: sub-metre detail, retired aggressively before it aliases.
        frequency = 5.1 * pow(1.48, localIndex);
        amplitude = 0.0027 * pow(0.64, localIndex);
        spread = 0.96;
      }

      float directionSeed = hash21(vec2(waveIndex + 0.73, waveIndex * 1.91 + 3.17));
      float phaseSeed = hash21(vec2(waveIndex * 2.37 + 1.11, waveIndex + 5.43));
      float angle = -0.08 + (directionSeed - 0.5) * spread;
      vec2 direction = vec2(sin(angle), cos(angle));
      float resolvable = 1.0 - smoothstep(0.48, 1.65, frequency * footprint);
      float mobileDetail = 1.0 - u_mobile * smoothstep(0.75, 2.0, band) * 0.58;
      float waveAmplitude = amplitude * resolvable * mobileDetail
        * mix(0.84, 1.16, phaseSeed);
      float angularVelocity = sqrt(9.81 * frequency);
      float phase = dot(direction, position) * frequency
        + angularVelocity * u_time * u_motion * 0.46
        + phaseSeed * 6.2831853;
      float harmonic = mix(0.13, 0.035, band * 0.5) * resolvable;

      height += waveAmplitude * (sin(phase) + harmonic * sin(phase * 2.0));
      gradient += direction * waveAmplitude * frequency
        * (cos(phase) + harmonic * 2.0 * cos(phase * 2.0));
    }

    vec3 normal = normalize(vec3(-gradient.x * 1.75, 1.0, -gradient.y * 1.75));
    normal = normalize(mix(
      normal,
      vec3(0.0, 1.0, 0.0),
      smoothstep(90.0, 225.0, distanceAlongRay)
    ));
    return vec4(normal, height);
  }

  vec3 filteredSkyReflection(vec2 uv, float radius) {
    vec3 colour = texture2D(u_image, uv).rgb * 0.44;
    colour += texture2D(u_image, vec2(clamp(uv.x - radius, 0.02, 0.98), uv.y)).rgb * 0.16;
    colour += texture2D(u_image, vec2(clamp(uv.x + radius, 0.02, 0.98), uv.y)).rgb * 0.16;
    colour += texture2D(u_image, vec2(uv.x, clamp(uv.y - radius * 0.65, 0.02, 0.98))).rgb * 0.12;
    colour += texture2D(u_image, vec2(uv.x, clamp(uv.y + radius * 0.65, 0.02, 0.98))).rgb * 0.12;
    return colour;
  }

  vec3 spectralOceanColour(vec2 imageUv, float imageY) {
    float aspect = u_resolution.x / u_resolution.y;
    float distanceBelowShore = max(u_shoreline - imageY, 0.00045);
    vec3 origin = vec3(0.0, 1.42, 0.0);
    vec3 ray = normalize(vec3(
      (v_uv.x - 0.5) * aspect * 1.06,
      -(0.010 + distanceBelowShore * 2.72),
      1.36
    ));
    float distanceAlongRay = oceanPlaneHit(origin, ray, -0.18);
    vec3 hit = origin + ray * distanceAlongRay;
    vec4 surface = spectralSurface(hit.xz, distanceAlongRay);
    vec3 normal = surface.xyz;
    vec3 flatReflection = reflect(ray, vec3(0.0, 1.0, 0.0));
    vec3 reflectedRay = reflect(ray, normal);
    vec3 reflectionDelta = reflectedRay - flatReflection;

    float reflectionX = clamp(
      imageUv.x + clamp(reflectionDelta.x * 0.18, -0.042, 0.042),
      0.02,
      0.98
    );
    float reflectionY = clamp(
      u_shoreline + 0.028 + clamp(
        flatReflection.y * 0.22 + reflectionDelta.y * 0.085,
        0.0,
        0.30
      ),
      u_shoreline + 0.018,
      0.965
    );
    float horizonFog = smoothstep(72.0, 230.0, distanceAlongRay);
    float reflectionRadius = mix(0.0035, 0.017, horizonFog);
    vec3 reflectedSky = filteredSkyReflection(
      vec2(reflectionX, reflectionY),
      reflectionRadius
    );
    reflectedSky = mix(reflectedSky, u_skyMean, 0.10 + horizonFog * 0.22);
    vec3 horizonColour = texture2D(
      u_image,
      vec2(clamp(imageUv.x, 0.02, 0.98), u_shoreline + 0.012)
    ).rgb;

    float viewFacing = clamp(dot(normal, -ray), 0.0, 1.0);
    float fresnel = 0.0204 + 0.9796 * pow(1.0 - viewFacing, 5.0);
    vec3 deepWater = mix(vec3(0.016, 0.033, 0.047), u_skyMean * 0.24, 0.30);
    vec3 ocean = mix(deepWater, reflectedSky, 0.24 + fresnel * 0.52);

    vec3 sunDirection = normalize(vec3(-0.035, 0.39, 1.0));
    float sunAlignment = max(dot(reflectedRay, sunDirection), 0.0);
    float sunGlint = pow(sunAlignment, 150.0) * 0.31
      + pow(sunAlignment, 30.0) * 0.025;
    float crest = smoothstep(0.045, 0.19, surface.w) * (1.0 - normal.y);
    ocean += reflectedSky * crest * 0.10;
    ocean += mix(reflectedSky, vec3(1.0, 0.79, 0.54), 0.48) * sunGlint;
    return mix(ocean, horizonColour, horizonFog * 0.82);
  }

  vec3 hybridOceanColour(vec2 imageUv, float imageY, float waterMask) {
    float aspect = u_resolution.x / u_resolution.y;
    float distanceBelowShore = max(u_shoreline - imageY, 0.00045);
    vec3 origin = vec3(0.0, 1.42, 0.0);
    vec3 ray = normalize(vec3(
      (v_uv.x - 0.5) * aspect * 1.06,
      -(0.010 + distanceBelowShore * 2.72),
      1.36
    ));
    float distanceAlongRay = oceanPlaneHit(origin, ray, -0.18);
    vec3 hit = origin + ray * distanceAlongRay;
    vec4 surface = spectralSurface(hit.xz, distanceAlongRay);
    vec3 normal = surface.xyz;

    // Keep the real photograph as the low-frequency truth. The simulation
    // perturbs it by less than two source pixels and fades out before the
    // horizon, where even tiny movement would read as texture crawl.
    float horizonFade = 1.0 - smoothstep(
      u_shoreline - 0.13,
      u_shoreline - 0.012,
      imageY
    );
    float effect = waterMask * horizonFade;
    // Nearer water moves more than far water. A uniform warp read as a flat
    // sheet shimmering in place; scaling by proximity restores the
    // perspective parallax the eye expects from a receding surface.
    float warpScale = mix(0.55, 1.35, smoothstep(0.02, 0.30, distanceBelowShore));
    vec2 warpedUv = imageUv;
    warpedUv.x += clamp(normal.x * 0.0038 * warpScale, -0.00115, 0.00115)
      * effect * u_motion;
    warpedUv.y += clamp(
      (normal.z * 0.0014 + surface.w * 0.00065) * warpScale,
      -0.00075,
      0.00075
    ) * effect * u_motion;
    warpedUv.y = clamp(warpedUv.y, 0.0, 0.992);
    vec3 photoSea = texture2D(u_image, warpedUv).rgb;

    vec3 sunDirection = normalize(vec3(-0.035, 0.39, 1.0));
    vec3 reflectedRay = reflect(ray, normal);
    float sunAlignment = max(dot(reflectedRay, sunDirection), 0.0);
    // The photograph already contains the sun's glitter path. Weighting the
    // dynamic glint by the photo's own brightness animates that existing
    // light instead of scattering competing sparkle across dark water.
    float photoLuma = dot(photoSea, vec3(0.299, 0.587, 0.114));
    float pathAnchor = 0.30 + 0.70 * smoothstep(0.16, 0.46, photoLuma);
    float sunGlint = (
      pow(sunAlignment, 145.0) * 0.10
      + pow(sunAlignment, 32.0) * 0.011
    ) * effect * pathAnchor;
    float ridgeLight = smoothstep(0.055, 0.19, surface.w)
      * (1.0 - normal.y) * 0.12 * effect;
    float directionalLight = (
      dot(normal, sunDirection) - dot(vec3(0.0, 1.0, 0.0), sunDirection)
    ) * 0.055 * effect;

    photoSea *= 1.0 + directionalLight;
    // Added light takes the photograph's warmth rather than the neutral sky
    // mean, so glints read as the same evening sun that lit the scene.
    vec3 glintTint = mix(u_skyMean, vec3(1.0, 0.80, 0.55), 0.45);
    photoSea += glintTint * (sunGlint + ridgeLight);
    return photoSea;
  }

  void main() {
    vec2 imageUv = coverUv(v_uv);
    // A restrained zoom into the sky accompanies the tilt. This preserves the
    // dramatic horizon movement while reducing the amount of frame that needs
    // to be synthesised beyond the photograph.
    float panCrop = mix(1.0, 0.80, u_cameraLift);
    imageUv = (imageUv - 0.5) * panCrop + 0.5;
    // A deliberate upward tilt: the photographed sky supplies the transition,
    // followed by a soft continuation only where the frame runs out.
    imageUv.y += 0.285 * u_cameraLift;
    float imageY = imageUv.y;
    vec2 baseUv = vec2(imageUv.x, clamp(imageUv.y, 0.0, 0.992));
    vec3 source = texture2D(u_image, baseUv).rgb;
    float sourceLuma = dot(source, vec3(0.299, 0.587, 0.114));

    float waterMask = smoothstep(u_waterBand.x, u_waterBand.x + 0.06, imageY)
      * (1.0 - smoothstep(u_waterBand.y - 0.07, u_waterBand.y, imageY));
    float portholeDistance = length((imageUv - vec2(0.5, 0.52)) * vec2(1.0, 1.02));
    float portholeMask = 1.0 - smoothstep(0.365, 0.43, portholeDistance);
    waterMask *= mix(1.0, portholeMask, u_porthole);

    // Suppress movement in very dark foreground rocks while retaining water texture.
    float structureGuard = smoothstep(0.055, 0.16, sourceLuma);
    // The hybrid warp stays under two source pixels, so dark open water can
    // safely move; only the photo mode's larger displacement needs the hard
    // guard. Without this softer floor the dark left and right thirds of
    // the sea sat still while only the bright sun path animated.
    float hybridWaterMask = waterMask * mix(0.65, 1.0, structureGuard);
    waterMask *= mix(0.2, 1.0, structureGuard);
    float depth = 1.0 - smoothstep(u_waterBand.x + 0.02, u_waterBand.y, imageY);
    float generatedOcean = max(max(u_proceduralOcean, u_gerstnerOcean), u_spectralOcean);

    // Avoid paying for animated distortion across the sky. On phones the
    // secondary wave is also deliberately quieter: very fine displacement at
    // one CSS pixel per fragment reads as shimmer rather than water.
    if (generatedOcean < 0.5 && u_hybridOcean < 0.5 && waterMask > 0.001) {
      float waveA = sin(imageUv.x * 44.0 + u_time * 0.42);
      float waveB = sin(imageUv.x * 81.0 - u_time * 0.24 + imageUv.y * 21.0);
      float drift = noise21(vec2(imageUv.x * 11.0 + u_time * 0.035, imageUv.y * 7.0));
      float waveBWeight = mix(0.45, 0.18, u_mobile);
      imageUv.x += (waveA + waveB * waveBWeight) * 0.00082
        * waterMask * depth * u_motion * u_strength;
      imageUv.y += (drift - 0.5) * 0.00125
        * waterMask * depth * u_motion * u_strength;
      vec2 displacedUv = vec2(imageUv.x, clamp(imageUv.y, 0.0, 0.992));
      source = texture2D(u_image, displacedUv).rgb;
    }

    if (u_hybridOcean > 0.5 && imageY < u_shoreline && hybridWaterMask > 0.001) {
      source = hybridOceanColour(imageUv, imageY, hybridWaterMask);
    }

    // Never stretch the last row of pixels. Build the continuation from broad
    // samples across two real bands of clear sky, then blend it in while there
    // is still genuine image beneath it. The increasingly global average
    // removes the column-shaped detail that created the visible vertical lines.
    if (imageY > 0.80) {
      float skyBlend = smoothstep(0.84, 1.005, imageY);
      float skyHeight = clamp((imageY - 0.84) / 0.38, 0.0, 1.0);
      float sampleY = mix(0.86, 0.965, skyHeight);
      vec3 continuedSky = wideSkySample(imageUv.x, sampleY);
      float globalBlend = smoothstep(0.94, 1.18, imageY) * 0.62;
      continuedSky = mix(continuedSky, u_skyMean, globalBlend);
      float softVariation = (noise21(v_uv * vec2(3.1, 2.3) + vec2(0.17, 0.61)) - 0.5) * 0.006;
      continuedSky += vec3(softVariation);
      // Continue the sky with the photograph itself: reflect the frame's own
      // upper sky back into the synthesised region. The seam is continuous by
      // mirror symmetry, and the clouds that appear are the photo's real
      // ones, so grain, softness, and light all match by construction.
      // The walk stops inside the cloud deck (0.66) so the mirrored frame
      // never reaches the horizon glow or the mountains, and the sample is
      // blurred and pulled toward the sky mean so the returning clouds read
      // as a higher, hazier bank rather than an upside-down copy.
      float mirrorReach = clamp((imageY - 0.965) / 0.28, 0.0, 1.0);
      float mirroredY = mix(0.965, 0.66, mirrorReach);
      vec3 mirrorSample = filteredSkyReflection(vec2(baseUv.x, mirroredY), 0.012);
      mirrorSample = mix(mirrorSample, u_skyMean, 0.35);
      float mirrorFade = smoothstep(0.975, 1.06, imageY);
      continuedSky = mix(continuedSky, mirrorSample, 0.72 * mirrorFade);
      source = mix(source, continuedSky, skyBlend);
    }

    // In 06 the photographic sea is removed at the source-image shoreline.
    // A two-pixel matte keeps the mountain edge antialiased without allowing
    // the old water to bleed into the procedural replacement.
    float shorelineFeather = max(0.0012, 2.0 / max(u_resolution.y, 1.0));
    float proceduralWaterMask = 0.0;
    if (generatedOcean > 0.5 && imageY < u_shoreline + shorelineFeather) {
      proceduralWaterMask = 1.0 - smoothstep(
        u_shoreline - shorelineFeather,
        u_shoreline + shorelineFeather,
        imageY
      );
      vec3 proceduralSource = u_spectralOcean > 0.5
        ? spectralOceanColour(imageUv, imageY)
        : u_gerstnerOcean > 0.5
          ? gerstnerOceanColour(imageUv, imageY)
          : proceduralOceanColour(imageUv, imageY);
      vec3 cleanShore = texture2D(
        u_image,
        vec2(baseUv.x, clamp(max(imageY, u_shoreline + shorelineFeather), 0.0, 0.992))
      ).rgb;
      source = mix(cleanShore, proceduralSource, proceduralWaterMask);
      waterMask = max(waterMask, proceduralWaterMask);
    }

    // Version 05 keeps the photographic sea but compresses its tonal range
    // around a low pivot and lowers it slightly. The feathered source-space
    // mask leaves the mountains, shoreline, and sky untouched.
    float photoSeaMask = u_photoSeaTone * (
      1.0 - smoothstep(u_shoreline - 0.018, u_shoreline + 0.008, imageY)
    );
    vec3 tonedSea = clamp(0.22 + (source - 0.22) * 0.86 - 0.018, 0.0, 1.0);
    source = mix(source, tonedSea, photoSeaMask);

    float skyExtension = smoothstep(0.992, 1.16, imageY);
    source *= 1.0 - skyExtension * 0.075;
    float luma = dot(source, vec3(0.299, 0.587, 0.114));
    luma = pow(max(luma, 0.0), 0.92);
    luma = smoothstep(0.025, 0.94, luma);

    float skyPosition = smoothstep(u_horizon, 0.98, imageY);
    float horizonHaze = exp(-pow((imageY - u_horizon) * 24.0, 2.0)) * 0.13;
    luma = luma * (1.0 - skyPosition * 0.39) + horizonHaze;
    float simulatedOcean = max(generatedOcean, u_hybridOcean * 0.45);
    luma += waterMask * pow(luma, 2.4) * mix(0.13, 0.04, simulatedOcean);

    vec3 graphite = vec3(0.025, 0.027, 0.029);
    vec3 silver = vec3(0.91, 0.92, 0.91);
    vec3 colour = mix(graphite, silver, clamp(luma, 0.0, 1.0));

    // The Earendil Works finishing pass maps the display-referred source to a
    // charcoal/silver range and adds animated, luminance-sensitive grain. The
    // continuous mix lets the photographed scene use a restrained treatment.
    // Source: github.com/earendil-works/website, _static/script.js
    if (u_earendilFilm > 0.001) {
      float earendilGray = dot(source, vec3(0.299, 0.587, 0.114));
      vec2 grainUv = gl_FragCoord.xy * u_grainScale / u_resolution;
      float grainSeed = dot(grainUv, vec2(12.9898, 78.233));
      float grainSample = fract(sin(grainSeed) * 43758.5453 + u_time * 1.5);
      float grainSigma = 0.36;
      float grainBell = exp(-(grainSample * grainSample) / (2.0 * grainSigma * grainSigma))
        / (grainSigma * sqrt(2.0 * 3.1415));
      float grainGain = 1.0 / max(0.4, 1.0 - u_cameraLift * 0.60);
      earendilGray += grainBell * (1.0 - earendilGray) * 0.0895 * grainGain;
      vec3 earendilColour = mix(vec3(0.05), vec3(1.0), clamp(earendilGray, 0.0, 1.0));
      colour = mix(colour, earendilColour, u_earendilFilm);
    }

    // Chroma survives only where the source is naturally warm. Hovering the
    // name slowly develops the photograph, but the capped mix never restores
    // the source image's full saturation.
    float warmth = smoothstep(0.035, 0.32, source.r - source.b);
    float nameField = 1.0 - smoothstep(0.13, 0.56, distance(v_uv, u_pointer));
    float colourAmount = warmth * u_colourLeak;
    colourAmount += warmth * u_nameHover * (0.43 + nameField * 0.11);
    vec3 mutedSource = mix(vec3(luma), source, 0.84);
    colour = mix(colour, mutedSource, clamp(colourAmount, 0.0, 0.59));
    // The completed upward view restores roughly sixty percent of the
    // photograph's colour, tied directly to the same scroll progress.
    colour = mix(colour, source, u_cameraLift * 0.60);

    // A very light, fixed dither remains on every version to prevent 8-bit
    // gradient banding. It never uses time, so it cannot shimmer or flash.
    float dither = fract(52.9829189 * fract(dot(
      gl_FragCoord.xy,
      vec2(0.06711056, 0.00583715)
    )));
    colour += vec3((dither - 0.5) * 0.006);

    // Versions 05 and 06 add a pronounced photographic grain. Two fixed
    // screen-space scales soften the digital character of a single-pixel
    // hash, while a luminance response lets the texture settle naturally
    // into darker parts of the photograph. No temporal seed means no mobile
    // crawl, even while the image pans or the procedural water moves.
    float fineGrain = hash21(gl_FragCoord.xy + vec2(19.7, 73.1)) - 0.5;
    float softGrain = noise21(gl_FragCoord.xy * 0.31 + vec2(8.4, 21.6)) - 0.5;
    float filmGrain = fineGrain * 0.78 + softGrain * 0.52;
    float displayedLuma = dot(colour, vec3(0.299, 0.587, 0.114));
    float shadowResponse = 1.0 - smoothstep(0.08, 0.90, displayedLuma);
    float filmStrength = mix(0.029, 0.050, shadowResponse)
      * mix(1.0, 0.86, u_mobile)
      * u_filmGrain;
    colour += vec3(filmGrain * filmStrength);

    float vignette = v_uv.x * (1.0 - v_uv.x) * v_uv.y * (1.0 - v_uv.y);
    vignette = pow(clamp(vignette * 18.0, 0.0, 1.0), 0.32);
    colour *= mix(0.54, 1.0, vignette);
    gl_FragColor = vec4(clamp(colour, 0.0, 1.0), 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Ocean shader failed to compile:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function OceanCanvas({ testMode = false }: { testMode?: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const identityRef = useRef<HTMLElement>(null);
  const aboutLayerRef = useRef<HTMLDivElement>(null);
  const aboutSlateRef = useRef<HTMLElement>(null);
  const sceneSwitcherRef = useRef<HTMLElement>(null);
  const creditRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [chromeHidden, setChromeHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [contextEpoch, setContextEpoch] = useState(0);
  const [identityEdit, setIdentityEdit] = useState(() => {
    const reducedMotion = typeof window !== "undefined"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reducedMotion
      ? { text: finalIdentityName, cursor: null as number | null, blinking: false }
      : { text: fullIdentityName, cursor: fullIdentityName.length as number | null, blinking: true };
  });
  const panProgressRef = useRef(0);
  const scrollRangeRef = useRef(1);
  const aboutOpenRef = useRef(false);
  const chromeHiddenRef = useRef(false);
  const proceduralOceanRef = useRef(false);
  const gerstnerOceanRef = useRef(false);
  const spectralOceanRef = useRef(false);
  const hybridOceanRef = useRef(false);
  const filmGrainRef = useRef(false);
  const earendilFilmRef = useRef(0);
  const photoSeaToneRef = useRef(false);
  const scene = scenes[2];
  const presentation = scenes[active].presentation;
  const nameStyle = scenes[active].nameStyle;

  useEffect(() => {
    const filmEffect = scenes[active].filmEffect;
    proceduralOceanRef.current = scenes[active].oceanMode === "procedural";
    gerstnerOceanRef.current = scenes[active].oceanMode === "gerstner";
    spectralOceanRef.current = scenes[active].oceanMode === "spectral";
    hybridOceanRef.current = scenes[active].oceanMode === "hybrid";
    filmGrainRef.current = filmEffect === "current";
    earendilFilmRef.current = filmEffect === "earendil" ? 1 : 0;
    photoSeaToneRef.current = active === 4;
  }, [active]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: number[] = [];
    const finish = () => {
      timers.forEach(window.clearTimeout);
      setIdentityEdit({ text: finalIdentityName, cursor: null, blinking: false });
    };
    const schedule = (delay: number, text: string, cursor: number | null, blinking = false) => {
      timers.push(window.setTimeout(() => {
        setIdentityEdit({ text, cursor, blinking });
      }, delay));
    };

    if (!reducedMotion.matches) {
      let delay = 1500;
      for (let cursor = fullIdentityName.length - 1; cursor >= 7; cursor -= 1) {
        schedule(delay, fullIdentityName, cursor);
        delay += 300;
      }
      delay += 500;
      schedule(delay, "Willia Hewitt", 6);
      schedule(delay + 320, "Willi Hewitt", 5);
      schedule(delay + 640, finalIdentityName, 4, true);
      schedule(delay + 2400, finalIdentityName, null);
    }

    const handleMotionPreference = () => {
      if (reducedMotion.matches) finish();
    };
    reducedMotion.addEventListener("change", handleMotionPreference);
    return () => {
      timers.forEach(window.clearTimeout);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let stableViewportHeight = stageRef.current?.offsetHeight || window.innerHeight;
    let measuredWidth = window.innerWidth;
    const stage = stageRef.current;
    const identity = identityRef.current;
    const name = identity?.querySelector<HTMLElement>(".identity-name");
    const nameLabel = name?.querySelector<HTMLElement>(".identity-name-label");
    const baselineProbe = nameLabel?.querySelector<HTMLElement>(".identity-baseline-probe");
    const nativeScrollTimeline = CSS.supports("animation-timeline: scroll()");
    let restOffset = 0;
    let remeasure = false;
    const measure = () => {
      remeasure = false;
      stableViewportHeight = stage?.offsetHeight || document.documentElement.clientHeight;
      if (stage && identity && name && nameLabel && baselineProbe) {
        const horizonY = projectCoveredSourceY(
          stage.offsetWidth,
          stableViewportHeight,
          photoFrame.width,
          photoFrame.height,
          photoFrame.horizonFromBottom,
        );
        // An empty inline-block sits on the alphabetic baseline, which is the
        // visual bottom of the descender-less name. The label's own box bottom
        // includes descent space, which floats the glyphs above the horizon.
        const letteringBottom =
          name.offsetTop + nameLabel.offsetTop + baselineProbe.offsetTop;
        restOffset = horizonY - letteringBottom;
      }
      scrollRangeRef.current = Math.max(
        1,
        document.documentElement.scrollHeight - document.documentElement.clientHeight,
      );
      // Written last: it invalidates layout, so every read above must land first.
      identity?.style.setProperty("--name-rest-y", `${restOffset}px`);
    };
    const update = () => {
      frame = 0;
      if (remeasure) measure();
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollRangeRef.current));
      const isMobile = window.innerWidth <= 640;
      const compactScale = isMobile ? 0.62 : 0.38;
      const compactCentre = isMobile ? 56 : 74;
      const compactTranslate = -stableViewportHeight * 0.5 + compactCentre;
      const nameTranslate = restOffset + progress * (compactTranslate - restOffset);
      const nameScale = 1 - progress * (1 - compactScale);
      // Modern browsers drive the name through a compositor-native CSS scroll
      // timeline. This remains as a direct, linear fallback for older browsers.
      if (!nativeScrollTimeline && identity) {
        identity.style.transform = `translate3d(0, ${nameTranslate}px, 0)`;
      }
      if (!nativeScrollTimeline && name) {
        name.style.transform = `translate3d(0, 0, 0) scale3d(${nameScale}, ${nameScale}, 1)`;
      }
      panProgressRef.current = progress;
      setAtTop(window.scrollY <= 1);

      const slateProgress = Math.min(1, Math.max(0, (progress - 0.62) / 0.38));
      const chromeOpacity = Math.max(0, 1 - progress * 4);
      const aboutLayer = aboutLayerRef.current;
      const aboutSlate = aboutSlateRef.current;
      if (aboutLayer) {
        aboutLayer.style.opacity = String(slateProgress);
        aboutLayer.style.visibility = slateProgress > 0.01 ? "visible" : "hidden";
        aboutLayer.style.pointerEvents = slateProgress > 0.7 ? "auto" : "none";
        aboutLayer.setAttribute("aria-hidden", slateProgress < 0.05 ? "true" : "false");
      }
      if (aboutSlate) {
        aboutSlate.style.transform = `translate3d(0, ${(1 - slateProgress) * -18}px, 0)`;
      }
      if (sceneSwitcherRef.current) {
        sceneSwitcherRef.current.style.opacity = String(chromeOpacity);
      }
      if (creditRef.current) {
        creditRef.current.style.opacity = String(chromeOpacity);
      }

      const nextAboutOpen = progress > 0.72;
      if (nextAboutOpen !== aboutOpenRef.current) {
        aboutOpenRef.current = nextAboutOpen;
        setAboutOpen(nextAboutOpen);
      }
      const nextChromeHidden = progress > 0.2;
      if (nextChromeHidden !== chromeHiddenRef.current) {
        chromeHiddenRef.current = nextChromeHidden;
        setChromeHidden(nextChromeHidden);
      }
    };
    const queueUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const handleResize = () => {
      // Mobile address bars emit height-only resize events during a gesture.
      // Re-measuring the range on those events makes progress jump. Width
      // changes still cover rotation; desktop keeps normal responsive sizing.
      // Measuring forces synchronous layout, so it is deferred to the same rAF
      // that applies the result. A drag emits many resize events per frame;
      // remeasuring on each one made the name and the camera lurch.
      const nextWidth = window.innerWidth;
      if (window.scrollY <= 1 || nextWidth > 640 || Math.abs(nextWidth - measuredWidth) > 2) {
        measuredWidth = nextWidth;
        remeasure = true;
      }
      queueUpdate();
    };
    measure();
    update();
    void document.fonts.ready.then(() => {
      measure();
      queueUpdate();
    });
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.remove("is-ready");

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      desynchronized: true,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vert = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vert || !frag) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 3, -1, -1, 3,
    ]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "a_position");
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const resolution = uniform("u_resolution");
    const imageResolution = uniform("u_imageResolution");
    const waterBand = uniform("u_waterBand");
    const horizon = uniform("u_horizon");
    const porthole = uniform("u_porthole");
    const strength = uniform("u_strength");
    const colourLeak = uniform("u_colourLeak");
    const pointer = uniform("u_pointer");
    const nameHoverUniform = uniform("u_nameHover");
    const cameraLiftUniform = uniform("u_cameraLift");
    const time = uniform("u_time");
    const motion = uniform("u_motion");
    const mobileUniform = uniform("u_mobile");
    const proceduralOceanUniform = uniform("u_proceduralOcean");
    const gerstnerOceanUniform = uniform("u_gerstnerOcean");
    const spectralOceanUniform = uniform("u_spectralOcean");
    const hybridOceanUniform = uniform("u_hybridOcean");
    const filmGrainUniform = uniform("u_filmGrain");
    const earendilFilmUniform = uniform("u_earendilFilm");
    const grainScaleUniform = uniform("u_grainScale");
    const photoSeaToneUniform = uniform("u_photoSeaTone");
    const shorelineUniform = uniform("u_shoreline");
    const skyMeanUniform = uniform("u_skyMean");
    const imageUniform = uniform("u_image");

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const image = new Image();
    image.decoding = "async";
    image.fetchPriority = "high";
    let frame = 0;
    let loaded = false;
    let disposed = false;
    let contextLost = false;
    let renderRequested = true;
    let uploadedBitmap: ImageBitmap | null = null;
    let hoveringName = false;
    let nameHover = 0;
    let previousMilliseconds = 0;
    let lastDrawMilliseconds = Number.NEGATIVE_INFINITY;
    let lastCameraLift = Number.NEGATIVE_INFINITY;
    let shaderTime = 0;
    let isMobile = window.matchMedia("(max-width: 640px)").matches;
    const pointerTarget = [0.5, 0.5];
    const pointerSmooth = [0.5, 0.5];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const name = identityRef.current?.querySelector<HTMLElement>(".identity-name");

    // The vertex stream and scene constants do not change between frames.
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolution, 1, 1);
    gl.uniform2f(imageResolution, 1, 1);
    gl.uniform2f(waterBand, scene.water[0], scene.water[1]);
    gl.uniform1f(horizon, scene.horizon);
    gl.uniform1f(porthole, scene.porthole);
    gl.uniform1f(strength, scene.strength);
    gl.uniform1f(colourLeak, scene.colourLeak);
    gl.uniform2f(pointer, pointerSmooth[0], pointerSmooth[1]);
    gl.uniform1f(nameHoverUniform, 0);
    gl.uniform1f(cameraLiftUniform, 0);
    gl.uniform1f(time, 0);
    gl.uniform1f(motion, reducedMotion.matches ? 0.08 : isMobile ? 0.34 : 1.0);
    gl.uniform1f(mobileUniform, isMobile ? 1.0 : 0.0);
    gl.uniform1f(proceduralOceanUniform, proceduralOceanRef.current ? 1.0 : 0.0);
    gl.uniform1f(gerstnerOceanUniform, gerstnerOceanRef.current ? 1.0 : 0.0);
    gl.uniform1f(spectralOceanUniform, spectralOceanRef.current ? 1.0 : 0.0);
    gl.uniform1f(hybridOceanUniform, hybridOceanRef.current ? 1.0 : 0.0);
    gl.uniform1f(filmGrainUniform, filmGrainRef.current ? 1.0 : 0.0);
    gl.uniform1f(earendilFilmUniform, earendilFilmRef.current);
    gl.uniform1f(grainScaleUniform, window.devicePixelRatio < 1.5 ? 1.7 : 1.0);
    gl.uniform1f(photoSeaToneUniform, photoSeaToneRef.current ? 1.0 : 0.0);
    // The original photograph's level waterline is at source row ~819/1536.
    gl.uniform1f(shorelineUniform, photoFrame.horizonFromBottom);
    gl.uniform3f(skyMeanUniform, 0.5, 0.5, 0.5);
    gl.uniform1i(imageUniform, 0);

    const updatePointer = (event: PointerEvent) => {
      pointerTarget[0] = event.clientX / window.innerWidth;
      pointerTarget[1] = 1.0 - event.clientY / window.innerHeight;
    };
    const enterName = (event: PointerEvent) => {
      hoveringName = true;
      updatePointer(event);
    };
    const leaveName = () => {
      hoveringName = false;
    };
    name?.addEventListener("pointerenter", enterName);
    name?.addEventListener("pointermove", updatePointer, { passive: true });
    name?.addEventListener("pointerleave", leaveName);
    window.addEventListener("blur", leaveName);

    const syncMotionUniforms = () => {
      gl.useProgram(program);
      gl.uniform1f(motion, reducedMotion.matches ? 0.08 : isMobile ? 0.34 : 1.0);
      gl.uniform1f(mobileUniform, isMobile ? 1.0 : 0.0);
      renderRequested = true;
    };

    // Applied from inside the render frame, never from the observer callback.
    // ResizeObserver runs after requestAnimationFrame but before paint, so
    // reallocating the drawing buffer there paints one cleared frame before the
    // next draw can land. Dragging a window edge turns that into a strobe.
    let resizePending = true;
    const applyResize = () => {
      resizePending = false;
      const nextMobile = window.matchMedia("(max-width: 640px)").matches;
      if (nextMobile !== isMobile) {
        isMobile = nextMobile;
        syncMotionUniforms();
      }
      const cssWidth = Math.max(1, canvas.clientWidth);
      const cssHeight = Math.max(1, canvas.clientHeight);
      const dprCap = isMobile ? 1.12 : 1.35;
      const pixelCap = isMobile ? 1_250_000 : 2_500_000;
      const pixelScale = Math.sqrt(pixelCap / (cssWidth * cssHeight));
      const quality = Math.min(window.devicePixelRatio || 1, dprCap, pixelScale);
      const width = Math.max(1, Math.round(cssWidth * quality));
      const height = Math.max(1, Math.round(cssHeight * quality));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.useProgram(program);
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(grainScaleUniform, window.devicePixelRatio < 1.5 ? 1.7 : 1.0);
      renderRequested = true;
    };
    const resizeObserver = new ResizeObserver(() => {
      resizePending = true;
    });
    resizeObserver.observe(canvas);
    applyResize();

    const handleMotionPreference = () => syncMotionUniforms();
    reducedMotion.addEventListener("change", handleMotionPreference);

    const sampleSkyMean = () => {
      const samplingCanvas = document.createElement("canvas");
      samplingCanvas.width = 3;
      samplingCanvas.height = 1;
      const context = samplingCanvas.getContext("2d", { willReadFrequently: true });
      if (!context) return [0.5, 0.5, 0.5] as const;
      const sourceY = Math.max(
        0,
        Math.min(image.naturalHeight - 1, Math.round(image.naturalHeight * (1 - 0.965))),
      );
      [0.16, 0.5, 0.84].forEach((x, index) => {
        const sourceX = Math.max(
          0,
          Math.min(image.naturalWidth - 1, Math.round(image.naturalWidth * x)),
        );
        context.drawImage(image, sourceX, sourceY, 1, 1, index, 0, 1, 1);
      });
      const pixels = context.getImageData(0, 0, 3, 1).data;
      const channel = (offset: number) => (
        pixels[offset] * 0.25 + pixels[4 + offset] * 0.5 + pixels[8 + offset] * 0.25
      ) / 255;
      return [channel(0), channel(1), channel(2)] as const;
    };

    const render = (milliseconds: number) => {
      if (disposed || contextLost) return;
      // Resize and draw land in the same frame, so a cleared buffer is never
      // what gets painted.
      if (resizePending) applyResize();
      const deltaSeconds = previousMilliseconds
        ? Math.min((milliseconds - previousMilliseconds) * 0.001, 0.1)
        : 0;
      previousMilliseconds = milliseconds;
      shaderTime = (shaderTime + deltaSeconds) % 7200;
      if (hoveringName) {
        // Ten seconds reaches the rich upper range, while remaining below full colour.
        nameHover = Math.min(0.92, nameHover + deltaSeconds * 0.092);
      } else {
        // A gentle photographic fade, rather than an abrupt interaction reset.
        nameHover *= Math.exp(-deltaSeconds / 1.65);
        if (nameHover < 0.001) nameHover = 0;
      }
      // Read the scroll offset in the draw frame itself. This avoids the
      // scroll-event -> rAF -> WebGL-rAF delay that was visible on phones.
      const cameraLift = Math.min(
        1,
        Math.max(0, window.scrollY / scrollRangeRef.current),
      );
      panProgressRef.current = cameraLift;
      if (cameraLift > 0.08) hoveringName = false;

      const cameraChanging = lastCameraLift < 0 || Math.abs(cameraLift - lastCameraLift) > 0.00002;
      lastCameraLift = cameraLift;
      const pointerChanging = Math.abs(pointerTarget[0] - pointerSmooth[0]) > 0.0002
        || Math.abs(pointerTarget[1] - pointerSmooth[1]) > 0.0002;
      const interactionActive = cameraChanging || hoveringName || nameHover > 0.001 || pointerChanging;
      const minimumFrameGap = reducedMotion.matches
        ? interactionActive ? 14 : 900
        : interactionActive ? 14 : 55;

      if (loaded && (renderRequested || milliseconds - lastDrawMilliseconds >= minimumFrameGap)) {
        pointerSmooth[0] += (pointerTarget[0] - pointerSmooth[0]) * 0.065;
        pointerSmooth[1] += (pointerTarget[1] - pointerSmooth[1]) * 0.065;
        gl.uniform1f(
          colourLeak,
          scene.colourLeak * (0.97 + Math.sin(shaderTime * 0.22) * 0.03),
        );
        gl.uniform2f(pointer, pointerSmooth[0], pointerSmooth[1]);
        gl.uniform1f(nameHoverUniform, nameHover);
        gl.uniform1f(cameraLiftUniform, cameraLift);
        gl.uniform1f(time, shaderTime);
        gl.uniform1f(proceduralOceanUniform, proceduralOceanRef.current ? 1.0 : 0.0);
        gl.uniform1f(gerstnerOceanUniform, gerstnerOceanRef.current ? 1.0 : 0.0);
        gl.uniform1f(spectralOceanUniform, spectralOceanRef.current ? 1.0 : 0.0);
        gl.uniform1f(hybridOceanUniform, hybridOceanRef.current ? 1.0 : 0.0);
        gl.uniform1f(filmGrainUniform, filmGrainRef.current ? 1.0 : 0.0);
        gl.uniform1f(earendilFilmUniform, earendilFilmRef.current);
        gl.uniform1f(photoSeaToneUniform, photoSeaToneRef.current ? 1.0 : 0.0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        canvas.classList.add("is-ready");
        renderRequested = false;
        lastDrawMilliseconds = milliseconds;
      }
      frame = requestAnimationFrame(render);
    };

    image.onload = async () => {
      const skyMean = sampleSkyMean();
      const maxWidth = isMobile ? 1280 : 2048;
      const scale = Math.min(1, maxWidth / image.naturalWidth);
      const uploadWidth = Math.max(1, Math.round(image.naturalWidth * scale));
      const uploadHeight = Math.max(1, Math.round(image.naturalHeight * scale));
      let source: TexImageSource = image;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;
      let sourceIsFlippedBitmap = false;

      if (typeof createImageBitmap === "function") {
        try {
          uploadedBitmap = await createImageBitmap(image, {
            imageOrientation: "flipY",
            resizeWidth: uploadWidth,
            resizeHeight: uploadHeight,
            resizeQuality: "high",
          });
          source = uploadedBitmap;
          sourceWidth = uploadedBitmap.width;
          sourceHeight = uploadedBitmap.height;
          sourceIsFlippedBitmap = true;
        } catch {
          uploadedBitmap = null;
        }
      }

      if (disposed || contextLost) {
        uploadedBitmap?.close();
        uploadedBitmap = null;
        return;
      }

      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, sourceIsFlippedBitmap ? 0 : 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.uniform2f(imageResolution, sourceWidth, sourceHeight);
      gl.uniform3f(skyMeanUniform, skyMean[0], skyMean[1], skyMean[2]);
      loaded = true;
      renderRequested = true;
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      canvas.classList.remove("is-ready");
      cancelAnimationFrame(frame);
    };
    const handleContextRestored = () => {
      if (!disposed) setContextEpoch((value) => value + 1);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    image.src = scene.src;
    frame = requestAnimationFrame(render);
    return () => {
      disposed = true;
      image.onload = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreference);
      name?.removeEventListener("pointerenter", enterName);
      name?.removeEventListener("pointermove", updatePointer);
      name?.removeEventListener("pointerleave", leaveName);
      window.removeEventListener("blur", leaveName);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      uploadedBitmap?.close();
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, [contextEpoch, scene]);

  const scrollToView = (target: number) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: scrollRangeRef.current * target,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={stageRef}
      className={`ocean-stage${
        scenes[active].filmEffect === "static" ? " has-static-grain" : ""
      }${active === 0 ? " is-jakub-refined" : ""}`}
    >
      <div
        className="fallback-image"
        style={{
          backgroundImage:
            `linear-gradient(180deg, rgb(0 0 0 / 64%), rgb(0 0 0 / 8%) 58%, rgb(0 0 0 / 42%)), url("${scene.src}")`,
        }}
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className="ocean-canvas" aria-hidden="true" />
      <section
        ref={identityRef}
        className="identity"
        aria-label="Will Hewitt"
      >
        <Button
          type="button"
          variant="ghost"
          className={nameStyle === "serif" ? "identity-name identity-name--serif" : "identity-name"}
          aria-label={aboutOpen ? "Close about card" : "Open about card"}
          aria-expanded={aboutOpen}
          aria-controls="about-slate"
          onClick={() => scrollToView(panProgressRef.current > 0.5 ? 0 : 1)}
        >
          <span className="identity-name-label" aria-hidden="true">
            {identityEdit.cursor === null ? identityEdit.text : (
              <>
                {identityEdit.text.slice(0, identityEdit.cursor)}
                <span
                  className={`identity-terminal-cursor${
                    identityEdit.blinking ? " is-blinking" : ""
                  }${identityEdit.cursor === identityEdit.text.length ? " is-empty" : ""}${
                    identityEdit.text[identityEdit.cursor] === " " ? " is-space" : ""
                  }`}
                >
                  {identityEdit.cursor < identityEdit.text.length
                    ? identityEdit.text[identityEdit.cursor] === " "
                      ? "\u00a0"
                      : identityEdit.text[identityEdit.cursor]
                    : "\u00a0"}
                </span>
                {identityEdit.text.slice(identityEdit.cursor + 1)}
              </>
            )}
            <span className="identity-baseline-probe" />
          </span>
        </Button>
      </section>
      <div
        ref={aboutLayerRef}
        className="about-layer"
        aria-hidden={!aboutOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) scrollToView(0);
        }}
      >
        <aside
          ref={aboutSlateRef}
          id="about-slate"
          className={`about-slate about-slate--${presentation}${
            nameStyle === "serif" ? " about-slate--newsreader" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="About Will Hewitt"
        >
          <AboutContent
            presentation={presentation}
            onClose={() => scrollToView(0)}
          />
        </aside>
      </div>
      {testMode && (
        <nav
          ref={sceneSwitcherRef}
          className={chromeHidden ? "scene-switcher is-hidden" : "scene-switcher"}
          aria-label="Choose version"
          aria-hidden={chromeHidden}
        >
          {scenes.map((item, index) => (
            <Button
              key={`${item.presentation}-${index}`}
              type="button"
              variant="ghost"
              size="sm"
              className={index === active ? "scene-button is-active" : "scene-button"}
              aria-pressed={index === active}
              aria-label={`Show ${item.label}: ${item.description}`}
              data-description={`${item.label} — ${item.description}`}
              tabIndex={chromeHidden ? -1 : 0}
              onClick={() => setActive(index)}
            >
              {String(index + 1).padStart(2, "0")}
            </Button>
          ))}
        </nav>
      )}
      <nav
        className={atTop ? "landing-contact" : "landing-contact is-hidden"}
        aria-label="Contact links"
        aria-hidden={!atTop}
      >
        <a href="mailto:hewittjswill@gmail.com" tabIndex={atTop ? 0 : -1}>Email</a>
        <a
          href="https://www.linkedin.com/in/william-js-hewitt/"
          target="_blank"
          rel="noreferrer"
          tabIndex={atTop ? 0 : -1}
        >
          LinkedIn
        </a>
      </nav>
      <p
        ref={creditRef}
        className={chromeHidden ? "credit is-hidden" : "credit"}
        aria-hidden="true"
      >
        36.753532° N · 22.800353° E
      </p>
    </div>
  );
}
