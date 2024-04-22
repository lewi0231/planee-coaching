import * as projectActions from "@/actions/project-actions";
import { ProjectDeep } from "@/lib/types/models";
import { beforeEach, describe, it, vi } from "vitest";

describe("Custom dialog", () => {
  const mockProject = {
    id: "1",
    title: "Test Project",
    description: "This is a Test",
    reward: "Test Reward",
    motivation: "Test Motivation",
    confidence: 1,
    projectValue: "10.00",
    barriers: "Test Barrier",
    dueDate: new Date().toISOString(),
    notifications: [],
    appearance: {
      background: "bg-red-200",
      foreground: "text-gray-900",
      icon: "CameraIcon",
    },
    isSelected: false,
    isPrivate: true,
  } satisfies ProjectDeep;

  const mockHandleOptimisticUpdate = vi.fn();
  const mockOnSubmitProjectEditAction = vi.fn();

  beforeEach(() => {
    vi.spyOn(projectActions, "onSubmitProjectEditAction").mockImplementation(
      mockOnSubmitProjectEditAction
    );



  it("renders the trigger content correctly", async () => {
    // TODO - need to deal with mocking the dependency schema
    // expect(screen.getByRole("button", { name: "Test Project" })).toBeTruthy();
  });
});
