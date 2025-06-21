import prerelease from "semver/functions/prerelease";

// Helper to determine if version is a pre-release
export function isPreRelease(version: string): boolean {
    return prerelease(version) != null
}