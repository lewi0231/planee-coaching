const iconNames = [
  "CameraIcon",
  "VideoIcon",
  "DesktopIcon",
  "EnvelopeClosedIcon",
  "EyeClosedIcon",
];

// export function DynamicIcon(name: string) {
//   const Icon = dynamic<IconProps>(
//     async () =>
//       await import(`@radix-ui/react-icons/dist/${name}`).then(
//         (module) => module[name]
//       )
//   );
//   return Icon;
// }

export function getRandomIconName() {
  const length = iconNames.length;
  const index = Math.floor(Math.random() * length);
  return iconNames[index];
}
