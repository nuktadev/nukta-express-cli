import fs from "fs-extra";
import path from "path";

export interface PerformanceMetrics {
  totalProjects: number;
  averageGenerationTime: number;
  cacheHitRate: number;
  lastProjectCreated: string;
  templatesUsed: Record<string, number>;
}

export class PerformanceMonitor {
  private metricsPath: string;
  private metrics: PerformanceMetrics;

  constructor() {
    this.metricsPath = path.join(process.cwd(), ".nukta-cli-metrics.json");
    this.metrics = this.loadMetrics();
  }

  private loadMetrics(): PerformanceMetrics {
    try {
      if (fs.existsSync(this.metricsPath)) {
        return fs.readJsonSync(this.metricsPath);
      }
    } catch (error) {
      // If metrics file is corrupted, start fresh
    }

    return {
      totalProjects: 0,
      averageGenerationTime: 0,
      cacheHitRate: 0,
      lastProjectCreated: "",
      templatesUsed: {},
    };
  }

  private saveMetrics(): void {
    try {
      fs.writeJsonSync(this.metricsPath, this.metrics, { spaces: 2 });
    } catch (error) {
      // Silently fail if we can't save metrics
    }
  }

  recordProjectCreation(
    projectName: string,
    template: string,
    generationTime: number,
    cacheHitRate: number
  ): void {
    this.metrics.totalProjects++;
    this.metrics.lastProjectCreated = new Date().toISOString();

    // Update average generation time
    const totalTime =
      this.metrics.averageGenerationTime * (this.metrics.totalProjects - 1) +
      generationTime;
    this.metrics.averageGenerationTime = totalTime / this.metrics.totalProjects;

    // Update cache hit rate
    this.metrics.cacheHitRate = cacheHitRate;

    // Update template usage
    this.metrics.templatesUsed[template] =
      (this.metrics.templatesUsed[template] || 0) + 1;

    this.saveMetrics();
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      totalProjects: 0,
      averageGenerationTime: 0,
      cacheHitRate: 0,
      lastProjectCreated: "",
      templatesUsed: {},
    };
    this.saveMetrics();
  }

  displayMetrics(): void {
    const metrics = this.getMetrics();

    console.log("\n📊 CLI Performance Metrics:");
    console.log("─".repeat(50));
    console.log(`Total projects created: ${metrics.totalProjects}`);
    console.log(
      `Average generation time: ${Math.round(metrics.averageGenerationTime)}ms`
    );
    console.log(`Cache hit rate: ${metrics.cacheHitRate}%`);

    if (metrics.lastProjectCreated) {
      const lastCreated = new Date(metrics.lastProjectCreated);
      console.log(`Last project created: ${lastCreated.toLocaleDateString()}`);
    }

    if (Object.keys(metrics.templatesUsed).length > 0) {
      console.log("\nTemplate usage:");
      Object.entries(metrics.templatesUsed)
        .sort(([, a], [, b]) => b - a)
        .forEach(([template, count]) => {
          console.log(`  • ${template}: ${count} projects`);
        });
    }

    console.log("─".repeat(50));
  }
}

export const performanceMonitor = new PerformanceMonitor();
