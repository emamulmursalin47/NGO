
export const SpinnerButton = ({ onClick, isLoading, name, ...props }) => {
  return (
    <>
      {isLoading ? (
        <button disabled {...props}>
          <p className=" mr-2 h-4 w-4 animate-spin" />
          Please wait <p />
        </button>
      ) : (
        <button {...props} onClick={onClick} type="submit">
          {name}
        </button>
      )}
    </>
  );
};
