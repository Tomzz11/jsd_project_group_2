import React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center  p-4  bg-center  absolute inset-0 z-0 " style={{ backgroundImage: "url('/ryan-walton-AbNO2iejoXA-unsplash.jpg')" } }>
        <div className=" w-full max-w-2xl mx-auto py-10">
          <form>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Register</FieldLegend>
                <FieldDescription>
                  All transactions are secure and encrypted
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Name
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-name-43j"
                      placeholder="Enter your name"
                      required
                    />
                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                      Lastname
                    </FieldLabel>
                    <Input
                      id="checkout-7j9-card-name-43j"
                      placeholder="Enter your lastname"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="">Email</FieldLabel>
                    <Input
                      id="useremail"
                      placeholder="example@gmail.com"
                      required
                      type="email"
                    />
                    <FieldLabel htmlFor="">Password</FieldLabel>
                    <Input
                      id="userpassword"
                      placeholder="Enter your password"
                      required
                      type="password"
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel htmlFor="checkout-exp-month-ts6">
                        Date of Birth
                      </FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="checkout-exp-month-ts6">
                          <SelectValue placeholder="Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="13">13</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="17">17</SelectItem>
                          <SelectItem value="18">18</SelectItem>
                          <SelectItem value="19">19</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="22">22</SelectItem>
                          <SelectItem value="23">23</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="26">26</SelectItem>
                          <SelectItem value="27">27</SelectItem>
                          <SelectItem value="28">28</SelectItem>
                          <SelectItem value="29">29</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="31">31</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-exp-month-ts6">
                        Mont of Birth
                      </FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="checkout-exp-month-ts6">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                        Year
                      </FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="checkout-7j9-exp-year-f59">
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Phone
                  </FieldLabel>
                  <Input
                    id="userphone"
                    placeholder="Enter your phone number"
                    required
                    type="tel"
                  />
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button type="submit" className="w-20 h-9">Submit</Button>
                <Link to="/Login"  >
                <Button variant="outline" type="button" className="w-20 h-9">
                  Back
                </Button>
                </Link>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
