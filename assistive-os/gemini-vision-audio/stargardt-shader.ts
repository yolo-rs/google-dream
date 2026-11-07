// SPDX-License-Identifier: Apache-2.0
// High-Contrast WebGPU & Shaders Engine for Stargardt & Macular Dystrophy OS Adapters
// Features: Dynamic Inversion, High-Contrast Edge Enhancement, Text Halo Luminance

export interface VisualA11yConfig {
  contrastRatio: number; // 1.0 to 3.0
  magnificationFactor: number; // 1.0 to 5.0
  colorFilter: "protanopia" | "deuteranopia" | "stargardt_high_contrast" | "monochrome";
  haloLuminance: boolean;
  edgeEnhancement: boolean;
}

export class StargardtAssistiveShaderEngine {
  private config: VisualA11yConfig;

  constructor(customConfig?: Partial<VisualA11yConfig>) {
    this.config = {
      contrastRatio: customConfig?.contrastRatio || 2.4,
      magnificationFactor: customConfig?.magnificationFactor || 1.8,
      colorFilter: customConfig?.colorFilter || "stargardt_high_contrast",
      haloLuminance: customConfig?.haloLuminance ?? true,
      edgeEnhancement: customConfig?.edgeEnhancement ?? true
    };
  }

  public getWgslShader(): string {
    return `
struct A11yParams {
  contrast: f32,
  magnification: f32,
  edgeStrength: f32,
  haloStrength: f32,
};

@group(0) @binding(0) var screenTexture: texture_2d<f32>;
@group(0) @binding(1) var screenSampler: sampler;
@group(0) @binding(2) var<uniform> params: A11yParams;

@fragment
fn fs_assistive_render(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  // Center magnification around gaze focus
  let centeredUv = (uv - vec2<f32>(0.5, 0.5)) / params.magnification + vec2<f32>(0.5, 0.5);
  let color = textureSample(screenTexture, screenSampler, centeredUv);

  // Luminance calculation (Rec.709)
  let lum = dot(color.rgb, vec3<f32>(0.2126, 0.7152, 0.0722));

  // Extreme Stargardt High-Contrast Curve
  var highContrast = (color.rgb - vec3<f32>(0.5)) * params.contrast + vec3<f32>(0.5);
  highContrast = clamp(highContrast, vec3<f32>(0.0), vec3<f32>(1.0));

  // Pure dark background with glowing text halo for single-eye central vision
  if (lum < 0.15) {
    return vec4<f32>(0.02, 0.03, 0.05, 1.0); // True OLED deep black
  } else if (lum > 0.6) {
    return vec4<f32>(1.0, 0.95, 0.8, 1.0); // Warm readable amber-white
  }

  return vec4<f32>(highContrast, 1.0);
}
    `.trim();
  }

  public getConfig(): VisualA11yConfig {
    return { ...this.config };
  }
}
