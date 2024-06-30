export default function LoginPerks() {
  return (
    <div className="w-full flex flex-col items-start justify-center space-y-2">
      <p className="text-lg font-medium">Perks of signing in</p>
      <ul className="w-full space-y-8 pt-2">
        <li className="w-full flex flex-col space-y-1">
          <p className="text-base font-medium">Track Freelancers</p>
          <p className="text-base text-gray-500">
            Have a look at the freelancers you have chosen and compare them to
            find the best one for you.
          </p>
        </li>
        <li className="w-full flex flex-col space-y-1">
          <p className="text-base font-medium">Get Verified</p>
          <p className="text-base text-gray-500">
            Let your freelancers know that you can be trusted by them
          </p>
        </li>
        <li className="w-full flex flex-col space-y-1">
          <p className="text-base font-medium">Control your money</p>
          <p className="text-base text-gray-500">
            By using our appointment system, you can control your money and pay
            only when you are satisfied with the service.
          </p>
        </li>
      </ul>
    </div>
  );
}
