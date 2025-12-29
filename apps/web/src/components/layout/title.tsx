interface LayoutTitleProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const LayoutTitle = ({
  title,
  description,
  children,
}: LayoutTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-bold text-foreground text-4xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};
